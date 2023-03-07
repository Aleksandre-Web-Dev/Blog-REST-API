const authConfig = require("../configurations/authConfig.json");
const serverConfig = require("../configurations/serverConfig.json");
const DatabaseService = require("./dbService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor() {}

  async register(user) {
    const [isPresent] = await DatabaseService.query(
      "SELECT username FROM User WHERE username = ?",
      [user.email],
      (err, result) => {
        console.log(result);
      }
    );
    if (!isPresent) {
      const password = await bcrypt.hash(
        user.password,
        authConfig.passwordLength
      );
      await DatabaseService.query(
        "INSERT INTO User(username, password) VALUES(?,?)",
        [user.email, password],
        (err, result) => {
          console.log(result);
        }
      );
    } else {
      throw serverConfig.errors.alreadyExist;
    }
  }

  async login(user) {
    const [isPresent] = await DatabaseService.query(
      "SELECT username FROM User WHERE username = ?",
      [user.email],
      (err, result) => {
        console.log(result);
      }
    );
    if (isPresent) {
      const [storedPassword] = await DatabaseService.query(
        "SELECT password FROM User WHERE username = ?",
        [user.email],
        (err, result) => {
          console.log(result);
        }
      );
      if (await bcrypt.compare(user.password, storedPassword.password)) {
        return jwt.sign({ user: user }, process.env.SECRET_KEY, {
          expiresIn: authConfig.tokenExpiryTime,
        });
      } else {
        throw serverConfig.errors.invalidPassword;
      }
    } else {
      throw serverConfig.errors.invalidUser;
    }
  }
}

module.exports = new UserService();
