import assert from "node:assert/strict";
function canRead(user, doc) { return Boolean(user && doc && user.id === doc.ownerId); }
assert.equal(canRead({ id: "a" }, { ownerId: "a" }), true);
assert.equal(canRead({ id: "a" }, { ownerId: "b" }), false);
console.log("Authorization boundary tests passed");