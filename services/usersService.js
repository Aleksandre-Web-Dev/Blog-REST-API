const authConfig = require("../configurations/authConfig.json");
const serverConfig = require("../configurations/serverConfig.json");
const QueryService = require("./queryService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserService {
  constructor() {}

  async register(user) {
    const [isPresent] = await QueryService.getUserByUsername(user.username);
    if (!isPresent) {
      const password = await bcrypt.hash(user.password, authConfig.saltLength);
      await QueryService.addUser(user.username, password);
    } else {
      throw serverConfig.errors.alreadyExist;
    }
  }

  async login(user) {
    const [isPresent] = await QueryService.getUserByUsername(user.username);
    if (isPresent) {
      const [storedPassword] = await QueryService.getPasswordByUsername(
        user.username
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
