const mysql = require("mysql2/promise");
const logger = require("./logger");
const dbConfig = require("../configurations/dbConfig");

class DatabaseService {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.connection = null;
  }

  async createConnection() {
    if (!this.connection) {
      this.connection = await mysql.createConnection(this.dbConfig.db);
      logger.info("Connection has been established");
    } else {
      logger.info("Connection Already Exists");
    }
  }

  closeConnection() {
    if (this.connection) {
      this.connection.destroy();
      logger.info("Connection has been closed");
    } else {
      logger.info("Connection has not been closed");
    }
  }

  async query(sql, params) {
    if (this.connection) {
      const [result] = await this.connection.execute(sql, params);
      logger.info(`Database Query ${sql} has been executed succesfully`);
      return result;
    } else {
      logger.info("Connection Does Not Exist");
    }
  }
}

module.exports = new DatabaseService(dbConfig);
