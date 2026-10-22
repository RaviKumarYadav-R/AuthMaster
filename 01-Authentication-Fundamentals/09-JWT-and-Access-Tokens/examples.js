function inspectJwtPayloadOnly(token) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Malformed JWT");
  return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
}
console.log("Payload decoding is inspection only; never use it to authorize a request.");