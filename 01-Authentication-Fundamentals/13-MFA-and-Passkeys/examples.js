const { createHash } = require("node:crypto");
const digest = value => createHash("sha256").update(value).digest("hex");
const unused = new Set([digest("synthetic-one-time-code")]);
function redeem(code) { const d = digest(code); if (!unused.has(d)) return false; unused.delete(d); return true; }
console.log(redeem("synthetic-one-time-code")); // true
console.log(redeem("synthetic-one-time-code")); // false