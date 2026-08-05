-- Operational Pages core: safe tenant helpers, onboarding, draft saves and immutable publishing.

alter table public.pages add column if not exists meta_title text not null default '' check (char_length(meta_title) <= 70);
alter table public.pages add column if not exists meta_description text not null default '' check (char_length(meta_description) <= 180);
alter table public.pages add column if not exists published_version_id uuid;
alter table public.pages add column if not exists published_at timestamptz;
alter table public.workspaces add column if not exists plan text not null default 'free' check (plan in ('free','portfolio','pages','business','commerce','agency','enterprise'));
alter table public.page_versions add column if not exists change_note text not null default 'Published version' check (char_length(change_note) <= 160);

do $$ begin
  alter table public.pages add constraint pages_published_version_fk foreign key (published_version_id) references public.page_versions(id) on delete set null;
exception when duplicate_object then null;
end $$;

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists audit_workspace_time_idx on public.audit_events(workspace_id, created_at desc);
alter table public.audit_events enable row level security;

create or replace function public.is_workspace_member(target uuid)
returns boolean language sql stable security definer set search_path = public, pg_temp
as $$ select exists(select 1 from public.workspace_members where workspace_id = target and user_id = (select auth.uid())) $$;

create or replace function public.can_edit_workspace(target uuid)
returns boolean language sql stable security definer set search_path = public, pg_temp
as $$ select exists(select 1 from public.workspace_members where workspace_id = target and user_id = (select auth.uid()) and role in ('owner','admin','editor')) $$;

create or replace function public.can_admin_workspace(target uuid)
returns boolean language sql stable security definer set search_path = public, pg_temp
as $$ select exists(select 1 from public.workspace_members where workspace_id = target and user_id = (select auth.uid()) and role in ('owner','admin')) $$;

revoke all on function public.is_workspace_member(uuid) from public, anon;
revoke all on function public.can_edit_workspace(uuid) from public, anon;
revoke all on function public.can_admin_workspace(uuid) from public, anon;
grant execute on function public.is_workspace_member(uuid) to authenticated;
grant execute on function public.can_edit_workspace(uuid) to authenticated;
grant execute on function public.can_admin_workspace(uuid) to authenticated;

drop policy if exists workspaces_member_read on public.workspaces;
drop policy if exists workspaces_member_write on public.workspaces;
drop policy if exists members_member_read on public.workspace_members;
drop policy if exists members_admin_write on public.workspace_members;
create policy workspaces_member_read on public.workspaces for select to authenticated using (public.is_workspace_member(id));
create policy workspaces_member_write on public.workspaces for update to authenticated using (public.can_admin_workspace(id)) with check (public.can_admin_workspace(id));
create policy members_member_read on public.workspace_members for select to authenticated using (public.is_workspace_member(workspace_id));
create policy members_admin_write on public.workspace_members for all to authenticated using (public.can_admin_workspace(workspace_id)) with check (public.can_admin_workspace(workspace_id));
create policy audit_member_read on public.audit_events for select to authenticated using (public.is_workspace_member(workspace_id));
grant select on public.audit_events to authenticated;

create or replace function public.bootstrap_workspace(
  workspace_name text, workspace_slug text, site_name text, site_slug text,
  site_type text, member_role_label text, starting_point text
) returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := auth.uid(); new_workspace uuid; new_site uuid; new_page uuid;
begin
  if actor is null then raise exception 'authentication_required'; end if;
  if char_length(workspace_name) not between 2 and 80 or char_length(site_name) not between 2 and 80 then raise exception 'invalid_name'; end if;
  if workspace_slug !~ '^[a-z0-9][a-z0-9-]{1,70}$' or site_slug !~ '^[a-z0-9][a-z0-9-]{1,70}$' then raise exception 'invalid_slug'; end if;
  if site_type not in ('business','portfolio','service','agency','other') then raise exception 'invalid_site_type'; end if;
  if starting_point not in ('template','business-information','blank') or char_length(member_role_label) not between 2 and 40 then raise exception 'invalid_onboarding'; end if;

  insert into public.profiles(id, full_name) values(actor, coalesce((select raw_user_meta_data->>'full_name' from auth.users where id=actor), 'Member')) on conflict(id) do nothing;
  insert into public.workspaces(name, slug, owner_id) values(workspace_name, workspace_slug, actor) returning id into new_workspace;
  insert into public.workspace_members(workspace_id, user_id, role) values(new_workspace, actor, 'owner');
  insert into public.sites(workspace_id, name, slug, type) values(new_workspace, site_name, site_slug, site_type) returning id into new_site;
  insert into public.pages(workspace_id, site_id, name, slug, page_type, is_homepage, position, meta_title, meta_description)
    values(new_workspace, new_site, 'Home', 'home', 'landing', true, 0, site_name, 'Built with Living Pages.') returning id into new_page;

  insert into public.page_blocks(workspace_id,page_id,type,content_props,style_props,position) values
    (new_workspace,new_page,'header',jsonb_build_object('brand',site_name,'links','Services,Work,About,Contact'),'{}',0),
    (new_workspace,new_page,'hero',jsonb_build_object('eyebrow',workspace_name,'headline','Build a clear case for what comes next.','body','A focused digital presence designed to stay current as the business evolves.','button','Start a conversation'),jsonb_build_object('tone','ivory'),1),
    (new_workspace,new_page,'feature-grid',jsonb_build_object('heading','One system. Built to move.','items',jsonb_build_array(jsonb_build_object('title','Clarity','body','A message people understand.'),jsonb_build_object('title','Character','body','A presence people remember.'),jsonb_build_object('title','Momentum','body','A system your team can evolve.'))),'{}',2),
    (new_workspace,new_page,'cta',jsonb_build_object('headline','Make the next move unmistakable.','button','Get in touch'),jsonb_build_object('tone','dark'),3),
    (new_workspace,new_page,'footer',jsonb_build_object('brand',site_name,'note','Built with Living Pages.'),'{}',4);
  insert into public.brands(workspace_id,tokens,voice,rules) values(new_workspace,'{"ink":"#121512","paper":"#f3f1ea","accent":"#dfff62"}','{"formal":35,"minimal":72,"simple":64,"bold":53}','{"approvalRequired":true}');
  insert into public.credit_accounts(workspace_id,balance) values(new_workspace,100);
  insert into public.audit_events(workspace_id,actor_id,action,entity_type,entity_id,metadata) values(new_workspace,actor,'workspace.created','workspace',new_workspace,jsonb_build_object('roleLabel',member_role_label,'startingPoint',starting_point));
  return jsonb_build_object('workspace_id',new_workspace,'site_id',new_site,'page_id',new_page);
end $$;

create or replace function public.create_site_with_homepage(target_workspace_id uuid, site_name text, site_slug text, site_type text)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := auth.uid(); new_site uuid; new_page uuid; current_plan text; site_count integer; site_limit integer;
begin
  if actor is null or not public.can_edit_workspace(target_workspace_id) then raise exception 'access_denied'; end if;
  if char_length(site_name) not between 2 and 80 or site_slug !~ '^[a-z0-9][a-z0-9-]{1,70}$' then raise exception 'invalid_site'; end if;
  if site_type not in ('business','portfolio','service','agency') then raise exception 'invalid_site_type'; end if;
  select plan into current_plan from public.workspaces where id=target_workspace_id for update;
  select count(*) into site_count from public.sites where workspace_id=target_workspace_id and deleted_at is null;
  site_limit := case current_plan when 'business' then 5 when 'commerce' then 5 when 'agency' then 25 when 'enterprise' then 2147483647 else 1 end;
  if site_count >= site_limit then raise exception 'site_entitlement_exceeded'; end if;
  insert into public.sites(workspace_id,name,slug,type) values(target_workspace_id,site_name,site_slug,site_type) returning id into new_site;
  insert into public.pages(workspace_id,site_id,name,slug,page_type,is_homepage,position,meta_title) values(target_workspace_id,new_site,'Home','home','landing',true,0,site_name) returning id into new_page;
  insert into public.page_blocks(workspace_id,page_id,type,content_props,style_props,position) values
    (target_workspace_id,new_page,'header',jsonb_build_object('brand',site_name,'links','Work,About,Contact'),'{}',0),
    (target_workspace_id,new_page,'hero',jsonb_build_object('eyebrow',site_name,'headline','Say something worth remembering.','body','Build the structured foundation, then make it unmistakably yours.','button','Start here'),jsonb_build_object('tone','ivory'),1),
    (target_workspace_id,new_page,'cta',jsonb_build_object('headline','Ready for what comes next?','button','Contact us'),jsonb_build_object('tone','dark'),2),
    (target_workspace_id,new_page,'footer',jsonb_build_object('brand',site_name,'note','Built with Living Pages.'),'{}',3);
  insert into public.audit_events(workspace_id,actor_id,action,entity_type,entity_id) values(target_workspace_id,actor,'site.created','site',new_site);
  return jsonb_build_object('site_id',new_site,'page_id',new_page);
end $$;

create or replace function public.save_page_draft(target_page_id uuid, expected_updated_at timestamptz, page_meta_title text, page_meta_description text, draft_blocks jsonb)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := auth.uid(); target_workspace uuid; current_updated timestamptz; block jsonb; idx integer := 0; saved_at timestamptz := clock_timestamp();
begin
  select workspace_id,updated_at into target_workspace,current_updated from public.pages where id=target_page_id and deleted_at is null for update;
  if target_workspace is null or actor is null or not public.can_edit_workspace(target_workspace) then raise exception 'access_denied'; end if;
  if current_updated <> expected_updated_at then raise exception 'draft_conflict'; end if;
  if jsonb_typeof(draft_blocks) <> 'array' or jsonb_array_length(draft_blocks) not between 1 and 80 or pg_column_size(draft_blocks) > 1048576 then raise exception 'invalid_blocks'; end if;
  delete from public.page_blocks where page_id=target_page_id;
  for block in select * from jsonb_array_elements(draft_blocks) loop
    if block->>'type' not in ('header','hero','feature-grid','text','cta','divider','footer') then raise exception 'invalid_block_type'; end if;
    insert into public.page_blocks(id,workspace_id,page_id,type,version,content_props,style_props,visibility_props,position)
    values((block->>'id')::uuid,target_workspace,target_page_id,block->>'type',coalesce((block->>'version')::integer,1),coalesce(block->'content','{}'),coalesce(block->'style','{}'),coalesce(block->'visibility','{"desktop":true,"tablet":true,"mobile":true}'),idx);
    idx := idx + 1;
  end loop;
  update public.pages set meta_title=page_meta_title,meta_description=page_meta_description,status=case when published_version_id is null then 'draft' else status end,updated_at=saved_at where id=target_page_id;
  insert into public.audit_events(workspace_id,actor_id,action,entity_type,entity_id,metadata) values(target_workspace,actor,'page.draft_saved','page',target_page_id,jsonb_build_object('blockCount',idx));
  return jsonb_build_object('updated_at',saved_at);
end $$;

create or replace function public.publish_page(target_page_id uuid, change_note text default 'Published version')
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := auth.uid(); target_workspace uuid; target_site uuid; next_version integer; new_version_id uuid; page_snapshot jsonb;
begin
  select workspace_id,site_id into target_workspace,target_site from public.pages where id=target_page_id and deleted_at is null for update;
  if target_workspace is null or actor is null or not public.can_edit_workspace(target_workspace) then raise exception 'access_denied'; end if;
  select coalesce(max(version),0)+1 into next_version from public.page_versions where page_id=target_page_id;
  select jsonb_build_object(
    'page',jsonb_build_object('id',p.id,'name',p.name,'slug',p.slug,'metaTitle',p.meta_title,'metaDescription',p.meta_description,'isHomepage',p.is_homepage),
    'blocks',coalesce((select jsonb_agg(jsonb_build_object('id',b.id,'type',b.type,'version',b.version,'content',b.content_props,'style',b.style_props,'visibility',b.visibility_props) order by b.position) from public.page_blocks b where b.page_id=p.id),'[]'::jsonb)
  ) into page_snapshot from public.pages p where p.id=target_page_id;
  if jsonb_array_length(page_snapshot->'blocks') = 0 then raise exception 'empty_page'; end if;
  insert into public.page_versions(workspace_id,page_id,version,snapshot,created_by,change_note) values(target_workspace,target_page_id,next_version,page_snapshot,actor,left(coalesce(change_note,'Published version'),160)) returning id into new_version_id;
  update public.pages set published_version_id=new_version_id,status='published',published_at=now(),updated_at=now() where id=target_page_id;
  update public.sites set status='published',published_at=coalesce(published_at,now()),updated_at=now() where id=target_site;
  insert into public.audit_events(workspace_id,actor_id,action,entity_type,entity_id,metadata) values(target_workspace,actor,'page.published','page',target_page_id,jsonb_build_object('version',next_version,'versionId',new_version_id));
  return jsonb_build_object('version_id',new_version_id,'version',next_version);
end $$;

create or replace function public.rollback_published_page(target_page_id uuid, target_version_id uuid)
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare actor uuid := auth.uid(); target_workspace uuid; selected_version integer;
begin
  select p.workspace_id,v.version into target_workspace,selected_version from public.pages p join public.page_versions v on v.page_id=p.id where p.id=target_page_id and v.id=target_version_id for update of p;
  if target_workspace is null or actor is null or not public.can_edit_workspace(target_workspace) then raise exception 'access_denied'; end if;
  update public.pages set published_version_id=target_version_id,status='published',published_at=now(),updated_at=now() where id=target_page_id;
  insert into public.audit_events(workspace_id,actor_id,action,entity_type,entity_id,metadata) values(target_workspace,actor,'page.rollback','page',target_page_id,jsonb_build_object('version',selected_version,'versionId',target_version_id));
  return jsonb_build_object('version_id',target_version_id,'version',selected_version);
end $$;

create or replace function public.get_published_page(requested_site_slug text, requested_page_slug text default 'home')
returns jsonb language sql stable security definer set search_path = public, pg_temp as $$
  select jsonb_build_object(
    'site',jsonb_build_object('name',s.name,'slug',s.slug),
    'page',v.snapshot->'page',
    'blocks',v.snapshot->'blocks'
  )
  from public.sites s
  join public.pages p on p.site_id=s.id and p.deleted_at is null
  join public.page_versions v on v.id=p.published_version_id
  where s.slug=requested_site_slug and s.status='published' and s.deleted_at is null
    and (p.slug=requested_page_slug or (requested_page_slug='home' and p.is_homepage))
  limit 1
$$;

revoke all on function public.bootstrap_workspace(text,text,text,text,text,text,text) from public, anon;
revoke all on function public.create_site_with_homepage(uuid,text,text,text) from public, anon;
revoke all on function public.save_page_draft(uuid,timestamptz,text,text,jsonb) from public, anon;
revoke all on function public.publish_page(uuid,text) from public, anon;
revoke all on function public.rollback_published_page(uuid,uuid) from public, anon;
grant execute on function public.bootstrap_workspace(text,text,text,text,text,text,text) to authenticated;
grant execute on function public.create_site_with_homepage(uuid,text,text,text) to authenticated;
grant execute on function public.save_page_draft(uuid,timestamptz,text,text,jsonb) to authenticated;
grant execute on function public.publish_page(uuid,text) to authenticated;
grant execute on function public.rollback_published_page(uuid,uuid) to authenticated;
grant execute on function public.get_published_page(text,text) to anon, authenticated;
