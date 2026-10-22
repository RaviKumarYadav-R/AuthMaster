async function login(account, session) {
  await session.regenerate();
  session.userId = account.id; // account must already be verified
  await session.save();
}
console.log("Adapt to the chosen maintained session library; this is lifecycle pseudocode.");