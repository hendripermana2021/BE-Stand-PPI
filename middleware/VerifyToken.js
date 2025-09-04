import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = {
      userId: decoded.id,
      name: decoded.name,
      id_role: decoded.id_role
    };

    req.id = decoded.userId;
    req.name = decoded.name;
    req.id_role = decoded.id_role;
    next();
  });
};