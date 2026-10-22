function canRead(principal, doc) {
  return Boolean(principal && doc && principal.userId === doc.ownerId);
}
console.log(canRead({ userId: "a" }, { ownerId: "b" })); // false