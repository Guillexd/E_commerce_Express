import { dirname } from "path";
import { fileURLToPath } from "url";
import obj from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//dirname targets to src folder, it has to dirname method becuase dirname method obtain directory path of your url path
export const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));

//with method hash from bcrypt we can hash a string (most common wat is 10 laps)
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//return a boolean to check a string with a same hashed string
export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

//method to create a token based on data from user
export const generateToken = (user) => {
  const token = jwt.sign({user}, obj.secret_key_jwt, { expiresIn: '1h' });
  return token;
}