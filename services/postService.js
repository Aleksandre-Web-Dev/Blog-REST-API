const serverConfig = require("../configurations/serverConfig.json");
const QueryService = require("../services/queryService");

class PostService {
  constructor() {}

  async create({ title, author, content, tags, creation_date }) {
    const [isPresent] = await QueryService.getPostByTitle(title);
    if (!isPresent) {
      const tagArray = tags;
      tagArray.forEach(async (element) => {
        const [isTagPresent] = await QueryService.getTagByName(element);
        if (!isTagPresent) {
          await QueryService.addTag(element);
        }
      });
      await QueryService.addPost(title, author, content, tags, creation_date);
    } else {
      throw serverConfig.errors.alreadyExist;
    }
  }

  async getAll() {
    const posts = await QueryService.getAllPosts();
    if (!posts.length) {
      throw "Could not get posts";
    } else {
      return posts;
    }
  }

  async getById(id) {
    const [post] = await QueryService.getPostById(id);
    if (!post) {
      throw "Post Does not Exist";
    } else {
      return post;
    }
  }

  async update({ title, author, content, tag, id }) {
    const [isPresent] = await QueryService.getPostById(id);
    if (!isPresent) {
      throw "Post Does not exist";
    } else {
      await QueryService.updatePost(title, author, content, tag, id);
    }
  }

  async delete(id) {
    await QueryService.deletePost(id);
  }
}

module.exports = new PostService();
