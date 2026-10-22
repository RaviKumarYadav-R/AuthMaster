function isAllowedOrigin(origin, allowlist) {
  return typeof origin === "string" && allowlist.includes(origin);
}
const allowlist = ["https://app.example.test"];
console.log(isAllowedOrigin("https://app.example.test", allowlist)); // true
console.log(isAllowedOrigin("https://evil.example", allowlist)); // false