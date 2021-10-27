const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ error: "A token is required for authentication." });
  }

  try {
    const decoded = jwt.verify(token, require("../secret").secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  return next();
};

module.exports = verifyToken;
