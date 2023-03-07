const DatabaseService = require("../services/dbService");

class QueryService {
  constructor() {}

  async getPostByTitle(title) {
    const query = await DatabaseService.query(
      "SELECT title FROM Posts WHERE title = ?",
      [title],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async getTagByName(tagName) {
    const query = await DatabaseService.query(
      "SELECT name FROM Tags WHERE name = ?",
      [tagName],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async addTag(tagName) {
    const query = await DatabaseService.query(
      "INSERT INTO Tags(name) VALUES (?)",
      [tagName],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async addPost(title, author, content, tags, creation_date) {
    const query = await DatabaseService.query(
      "INSERT INTO Posts(title,author,content,tag,creation_date) VALUES (?,?,?,?,?)",
      [title, author, content, tags.toString(), creation_date],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async getAllPosts() {
    const query = await DatabaseService.query(
      "SELECT * FROM Posts",
      null,
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async getPostById(id) {
    const query = await DatabaseService.query(
      "SELECT id,title,author,content,creation_date FROM Posts WHERE id = ?",
      [id],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async deletePost(id) {
    const query = await DatabaseService.query(
      "DELETE FROM Posts WHERE id = ?",
      [id],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async updatePost(title, author, content, tag, id) {
    const query = await DatabaseService.query(
      "UPDATE Posts SET title=?,author=?,content=?,tag=? WHERE id = ?",
      [title, author, content, tag, id],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async getUserByUsername(username) {
    const query = await DatabaseService.query(
      "SELECT username FROM User WHERE username = ?",
      [username],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async addUser(username, password) {
    const query = await DatabaseService.query(
      "INSERT INTO User(username, password) VALUES(?,?)",
      [username, password],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }

  async getPasswordByUsername(username) {
    const query = await DatabaseService.query(
      "SELECT password FROM User WHERE username = ?",
      [username],
      (err, result) => {
        console.log(result);
      }
    );
    return query;
  }
}

module.exports = new QueryService();
