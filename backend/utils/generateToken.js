import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;

// payload is just id (it will be embedded in token: header.payload.verify), secret is inside .env, expires in 7 days
