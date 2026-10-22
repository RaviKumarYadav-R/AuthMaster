const records = new Map([["digest-t1", { active: true }]]);
function consumeOnce(digest) {
  const record = records.get(digest);
  if (!record || !record.active) return false;
  record.active = false;
  return true;
}
console.log(consumeOnce("digest-t1")); // true
console.log(consumeOnce("digest-t1")); // false in this single-process teaching model