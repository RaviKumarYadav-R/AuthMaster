function validate(input) {
  if (!input || typeof input.email !== "string" || !input.email.includes("@")) return false;
  if (typeof input.password !== "string" || input.password.length < 12 || input.password.length > 1024) return false;
  return true;
}
console.log(validate({ email: "learner@example.com", password: "synthetic-demo-password" }));