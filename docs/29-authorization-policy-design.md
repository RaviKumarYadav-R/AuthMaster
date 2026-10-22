# 29 — Designing Authorization Policies

Authorization is a policy decision, not merely a route guard. It answers: which principal may perform which action on which resource under which conditions?

## Policy tuple
A useful mental model is:

**principal + action + resource + context → allow or deny**

Context can include resource ownership, tenant, account status, time, device/session assurance, or the state of a workflow.

## RBAC
Role-Based Access Control associates users with roles and roles with permissions. It is easy to understand, but roles can become too broad. A role check such as admin is only one policy input; the system still needs to define which actions and resources it permits.

## Resource ownership
For a private note, do not fetch any note by ID and then trust the client to decide whether it belongs to the current user. Constrain the lookup by both resource ID and authenticated user/tenant context, or load the resource and perform a deliberate policy check before returning or mutating it.

## Deny by default
Protected routes should deny requests unless the required authorization policy passes. New routes must not accidentally inherit an open default. Centralize policy helpers where this improves consistency, but keep resource-specific checks explicit enough to audit.

## Avoid confused-deputy behavior
A backend service may have broad database privileges. It must not use those privileges on behalf of a caller without validating the caller's rights. Never accept a user ID, tenant ID, or role from request data as proof of permission.

## Authorization test design
For each resource route, test:
- anonymous caller
- authenticated owner
- authenticated non-owner
- read-only share recipient
- user from another tenant
- disabled account
- administrator and non-administrator
- malformed or nonexistent resource ID
- bulk and export endpoints
- concurrent ownership or permission changes where relevant

Verify both the response and the absence of unauthorized state changes.

## Exercise
Design policies for private notes, shared notes, team folders, and tenant invoices. Write a table of principals, actions, resources, and expected allow/deny outcomes before writing middleware.
