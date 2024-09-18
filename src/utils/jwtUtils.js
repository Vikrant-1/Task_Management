import jwt from "jsonwebtoken";
export function generateJwtToken({ username, id }) {
  const token = jwt.sign({ username, id: id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
}

export function verifyJwtToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}
