function matchesState(expected, received) {
  return typeof expected === "string" && expected.length > 0 && expected === received;
}
console.log(matchesState("txn-123", "txn-123")); // true
console.log(matchesState("txn-123", "attacker-value")); // false
console.log("State validation alone does not validate an ID token.");