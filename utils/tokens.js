import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function decodeToken(token) {
  return jwt.verify(token, "fwefwefwef32r32423rt323@@@");
}

export function createToken(user_id, username) {
  return jwt.sign({ user_id, username }, "fwefwefwef32r32423rt323@@@");
}
