const db = require("../database");

class UsersModel {
  authenticateUser(parameter) {
    const email = parameter[0];
    const password = parameter[1];
    try {
      const result = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").all(email, password);
      return result;
    } catch(err) {
      console.log(err);
      return [];
    }
  }

  registerUser(fullname, username, email, password) {
    return db.prepare("INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)").run(fullname, username, email, password, "customer");
  }

  findUserById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  }
}

module.exports = UsersModel;
