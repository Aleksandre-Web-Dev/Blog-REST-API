const serverConfig = require("../configurations/serverConfig.json");
const DatabaseService = require("./dbService");

class PostService {
  constructor() {}

  async create(post) {
    const [isPresent] = await DatabaseService.query(
      "SELECT title FROM Posts WHERE title = ?",
      [post.title],
      (err, result) => {
        console.log(result);
      }
    );
    if (!isPresent) {
      await DatabaseService.query(
        "INSERT INTO Posts(title,author,content,creation_date) VALUES (?,?,?,?)",
        [post.title, post.author, post.content, post.creation_date],
        (err, result) => {
          console.log(result);
        }
      );
    } else {
      throw serverConfig.errors.alreadyExist;
    }
  }

  async getAll() {
    const posts = await DatabaseService.query(
      "SELECT * FROM Posts",
      null,
      (err, result) => {
        console.log(result);
      }
    );
    if (!posts.length) {
      throw "Could not get posts";
    } else {
      return posts;
    }
  }

  async getById(id) {
    const [post] = await DatabaseService.query(
      "SELECT id,title,author,content,creation_date FROM Posts WHERE id = ?",
      [id],
      (err, result) => {
        console.log(result);
      }
    );
    if (!post) {
      throw "Post Does not Exist";
    } else {
      return post;
    }
  }

  async delete(id) {
    await DatabaseService.query(
      "DELETE FROM Posts WHERE id = ?",
      [id],
      (err, result) => {
        console.log(result);
      }
    );
  }

  async update(post) {
    const [isPresent] = await DatabaseService.query(
      "SELECT id FROM Posts WHERE id = ?",
      [post.id],
      (err, result) => {
        console.log(result);
      }
    );
    if (!isPresent) {
      throw "Post Does not exist";
    } else {
      await DatabaseService.query(
        "UPDATE Posts SET title=?,author=?,content=? WHERE id = ?",
        [post.title, post.author, post.content, post.id],
        (err, result) => {
          console.log(result);
        }
      );
    }
  }
}

module.exports = new PostService();
