const serverConfig = require("../configurations/serverConfig.json");
const PostService = require("../services/postService");
const express = require("express");
const router = express.Router();

router.post(serverConfig.routes.post.create, async (req, res) => {
  try {
    res.json(await PostService.create(req.body));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(serverConfig.routes.post.getAll, async (req, res) => {
  try {
    res.json(await PostService.getAllPosts());
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get(`${serverConfig.routes.post.getById}/:id`, async (req, res) => {
  try {
    res.json(await PostService.getById(req.params.id));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete(`${serverConfig.routes.post.delete}/:id`, async (req, res) => {
  res.json(await PostService.delete(req.params.id));
});

router.patch(serverConfig.routes.post.update, async (req, res) => {
  try {
    res.json(await PostService.update(req.body));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
