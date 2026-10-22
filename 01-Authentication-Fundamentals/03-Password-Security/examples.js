async function register(password, hasher) {
  if (typeof password !== "string" || password.length < 12) throw new Error("Invalid password");
  const passwordHash = await hasher.hash(password);
  return { passwordHash }; // Persist the hash; never return it to the client.
}
console.log("Use a maintained password-hashing library in the actual lab.");