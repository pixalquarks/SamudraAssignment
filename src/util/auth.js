import jwt from "jsonwebtoken";
import config from "../config.js";

const jwtsecretkey = config.jwt.secret || "dklsfjdklfjskfjesldf";
const jwt_expiration_time = config.jwt.expiresIn || "1d";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.username,
    },
    jwtsecretkey,
    {
      expiresIn: jwt_expiration_time,
    }
  );
};

export const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, jwtsecretkey, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token, Not Authorized" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Auth Token provided" });
  }
};

export default null;
