function canAccess({ user, resource, action }) {
  if (!user || !resource || user.tenantId !== resource.tenantId) return false;
  if (action === "read") return resource.ownerId === user.id || user.roles.includes("tenant-admin");
  if (["update", "delete"].includes(action)) return resource.ownerId === user.id;
  return false; // deny by default
}
console.log(canAccess({ user: { id: "a", tenantId: "t1", roles: [] }, resource: { ownerId: "b", tenantId: "t1" }, action: "read" }));