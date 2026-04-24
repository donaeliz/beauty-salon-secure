const db = require("../database");

class UsersModel {
  // VULNERABLE: SQL Injection - string concatenation
  authenticateUser(parameter) {
    const email = parameter[0];
    const password = parameter[1];
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    try {
      const result = db.prepare(query).all();
      return result;
    } catch(err) {
      return [];
    }
  }

  // VULNERABLE: plaintext password storage
  registerUser(fullname, username, email, password) {
    return db.prepare(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)"
    ).run(fullname, username, email, password, "customer");
  }

  findUserById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  }
}

module.exports = UsersModel;