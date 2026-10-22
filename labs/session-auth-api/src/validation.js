const { z } = require('zod');

const credentialsSchema = z.object({
  email: z.string().trim().email().max(254).transform(value => value.toLowerCase()),
  password: z.string().min(12).max(128),
}).strict();

function parseCredentials(input) {
  return credentialsSchema.safeParse(input);
}

module.exports = { credentialsSchema, parseCredentials };
