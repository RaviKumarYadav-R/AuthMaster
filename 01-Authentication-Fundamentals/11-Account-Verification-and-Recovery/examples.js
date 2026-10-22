const { randomBytes, createHash } = require("node:crypto");
function createToken() {
  const raw = randomBytes(32).toString("base64url");
  const digest = createHash("sha256").update(raw).digest("hex");
  return { raw, digest };
}
const token = createToken();
console.log(token.digest.length === 64); // Store digest + purpose + expiry; deliver raw token securely.