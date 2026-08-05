# Data model

The hierarchy is `User ↔ Workspace → Site → Page → Draft Blocks / Immutable Versions`. Workspace-scoped brand, content, sources, automations, credits, domains, audit and analytics records share the tenant key. `workspace_members` maps users to owner/admin/editor/viewer roles.

`page_blocks` is the mutable draft. A publish transaction snapshots page metadata and ordered blocks into `page_versions`, then changes `pages.published_version_id`. Public rendering reads only that selected snapshot. Rollback selects an older immutable snapshot and never mutates the current draft.

The operational migration repairs membership-policy recursion with security-definer membership predicates, limits direct grants, and supplies authenticated RPC boundaries for workspace bootstrap, site creation, conflict-aware draft saving, publishing, rollback and public snapshot reads.

Commerce tables and advanced enterprise organization/brand hierarchy are deferred until their workflows are implemented end to end.
