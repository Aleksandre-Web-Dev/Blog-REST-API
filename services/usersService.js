const authConfig = require("../configurations/authConfig.json");
const serverConfig = require("../configurations/serverConfig.json");
const DatabaseService = require("./dbService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor() {}

  async register(user) {
    const isExist = await DatabaseService.query(
      "SELECT username FROM User WHERE username = ?",
      [user.email],
      (err, result) => {
        console.log(result);
      }
    );
    if (isExist.length == 0) {
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
    const isExist = await DatabaseService.query(
      "SELECT username FROM User WHERE username = ?",
      [user.email],
      (err, result) => {
        console.log(result);
      }
    );
    if (isExist.length !== 0) {
      const [userPassword] = await DatabaseService.query(
        "SELECT password FROM User WHERE username = ?",
        [user.email],
        (err, result) => {
          console.log(result);
        }
      );
      if (await bcrypt.compare(user.password, userPassword.password)) {
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
