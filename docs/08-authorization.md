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
