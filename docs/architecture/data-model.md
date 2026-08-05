# Data model

The hierarchy is `User ↔ Workspace → Site → Page → Block/Version`. Workspace-scoped brand, content, sources, automations, credits, domains and analytics records share the tenant key. `workspace_members` maps users to owner/admin/editor/viewer roles. See the authoritative SQL migration for constraints, indexes and RLS.

Commerce tables and advanced enterprise organization/brand hierarchy are deferred until their workflows are implemented end to end.
