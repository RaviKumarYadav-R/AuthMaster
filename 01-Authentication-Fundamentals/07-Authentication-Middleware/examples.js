function requirePrincipal(req, res, next) {
  if (!req.authenticatedPrincipal) return res.status(401).json({ error: "authentication_required" });
  return next();
}
console.log("Wire this handler after maintained-library session/token verification.");