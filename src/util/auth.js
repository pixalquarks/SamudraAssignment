import jwt from "jsonwebtoken";

const jwtsecretkey = process.env.JWT_SECRET_KEY || "dklsfjdklfjskfjesldf";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.username,
    },
    jwtsecretkey,
    {
      expiresIn: "1d",
    }
  );
};

export const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, jwtsecretkey, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export default null;
