const serverConfig = require("../configurations/serverConfig.json");
const express = require("express");
const UserService = require("../services/usersService");
const router = express.Router();

router.post(serverConfig.routes.user.Register, async (req, res) => {
  try {
    res.json(await UserService.register(req.body));
  } catch (err) {
    res.status(serverConfig.errors.statusCode).send(err);
  }
});

router.post(serverConfig.routes.user.Login, async (req, res) => {
  try {
    res.json(await UserService.login(req.body));
  } catch (err) {
    res.status(serverConfig.errors.statusCode).send(err);
  }
});

module.exports = router;
