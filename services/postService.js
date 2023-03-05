const serverConfig = require("../configurations/serverConfig.json");
const DatabaseService = require("./dbService");

class PostService {
  constructor() {}

  async create(post) {
    const isExist = await DatabaseService.query(
      "SELECT title FROM POSTS WHERE title = ?",
      [post.title],
      (err, result) => {
        console.log(result);
      }
    );
    console.log(isExist.length);
    if (isExist.length == 0) {
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

  async getAllPosts() {
    const posts = await DatabaseService.query(
      "SELECT * FROM Posts",
      null,
      (err, result) => {
        console.log(result);
      }
    );
    if (posts.length !== 0) {
      return posts;
    } else {
      throw "Could not get posts";
    }
  }

  async getById(id) {
    const post = await DatabaseService.query(
      "SELECT id,title,author,content,creation_date FROM Posts WHERE id = ?",
      [id],
      (err, result) => {
        console.log(result);
      }
    );
    if (post.length == 0) {
      throw "Post Does not Exist";
    } else {
      console.log(typeof post)
      return post[0];
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
    console.log(post);
    const isExist = await DatabaseService.query(
      "SELECT id FROM Posts WHERE id = ?",
      [post.id],
      (err, result) => {
        console.log(result);
      }
    );
    if (isExist.length == 0) {
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
