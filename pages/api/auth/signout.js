const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

export default async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout success" });
};
