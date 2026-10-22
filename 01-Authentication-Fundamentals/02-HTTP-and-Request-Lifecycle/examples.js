function summarize(req) {
  return { method: req.method, path: req.path,
    hasCookie: Boolean(req.headers.cookie),
    hasAuthorization: Boolean(req.headers.authorization) };
}
console.log(summarize({ method: "GET", path: "/me", headers: { cookie: "secret" } }));