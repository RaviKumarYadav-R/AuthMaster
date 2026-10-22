# 08 — Authorization and Access Control

## Authentication is not authorization

A valid session proves the server recognizes a principal. It does not prove that principal can access a particular note, course, invoice, or tenant.

## RBAC and resource ownership

Role-Based Access Control associates users with roles and roles with permissions. Roles are convenient but can become too broad. For a route such as `GET /api/notes/:id`, load the resource and check ownership or an explicit share permission. Never trust a user ID supplied by the client as proof of ownership.

## Multi-tenant isolation

Every tenant-scoped query must be constrained to the authenticated tenant context. Test cross-tenant identifiers and background jobs as well as ordinary routes.

## Least privilege

Grant only required permissions. Separate administrative operations from ordinary flows. Sensitive role changes need server-side authorization and should be audited.

## Exercises

- User A must not read or delete User B's private note.
- A shared note grants read but not write.
- A regular user cannot assign themselves an admin role.
- Tenant A cannot fetch Tenant B's invoice by changing an ID.
- A disabled account cannot perform protected actions despite stale UI state.

## Deep dive: authorization matrix

For each resource type, create a matrix of actions such as list, read, create, update, delete, share, export, and administer. Rows should include anonymous users, ordinary users, owners, collaborators, tenant administrators, and platform administrators where applicable. Define every allowed and denied cell explicitly.

### Resource ownership and tenant isolation
Derive the caller identity from validated server-side authentication state. Scope database queries by resource ID and permitted owner or tenant wherever possible. Do not accept ownerId, role, or tenantId from the request body as proof of permission. Apply the same rules to list endpoints, bulk operations, exports, background jobs, and administrative APIs.

### Deny by default
Unknown roles, stale memberships, missing policy inputs, malformed identifiers, and policy-service failures must not accidentally grant access. Choose consistent 401 and 403 behavior while considering resource-existence leakage.

### Exercise
Create two users in two tenants. Test read, update, delete, list, and export across user and tenant boundaries. Every denied operation must leave state unchanged. Add a regression test for each discovered authorization bug.

