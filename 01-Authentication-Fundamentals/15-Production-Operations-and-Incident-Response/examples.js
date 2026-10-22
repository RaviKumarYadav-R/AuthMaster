const required = ["SESSION_SECRET", "MONGODB_URI"];
function validateEnv(env) {
  const missing = required.filter(name => !env[name] || !env[name].trim());
  if (missing.length) throw new Error("Missing required environment variables: " + missing.join(", "));
  return true;
}
try { validateEnv({ SESSION_SECRET: "", MONGODB_URI: "mongodb://localhost/dev" }); }
catch (error) { console.log(error.message); } // Prints names, not secret values.