const UsersModel = require("../models/usersModel");
const db = require("../database");
const usersModel = new UsersModel();

exports.renderDashboard = (req, res) => {
  if (!req.session.user) return res.redirect("/");
  const user = req.session.user;
  if (user.role === "admin") {
    const users = db.prepare("SELECT * FROM users").all();
    const appointments = db.prepare("SELECT * FROM appointments").all();
    const services = db.prepare("SELECT * FROM services").all();
    return res.render("dashboard", { user, users, appointments, services, message: "" });
  } else {
    const appointments = db.prepare("SELECT * FROM appointments WHERE user_id = ?").all(user.id);
    const services = db.prepare("SELECT * FROM services").all();
    return res.render("dashboard", { user, users: [], appointments, services, message: "" });
  }
};

// VULNERABLE: no input validation
exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  const result = usersModel.authenticateUser([username, password]);
  if (result && result.length > 0) {
    req.session.user = result[0];
    return res.redirect("/dashboard");
  } else {
    return res.render("index", { message: "Invalid email or password" });
  }
};

exports.viewRegister = (req, res) => {
  res.render("register", { message: "" });
};

// VULNERABLE: no validation, plaintext password
exports.registerUser = (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    usersModel.registerUser(fullname, username, email, password);
    res.render("index", { message: "Registration successful! Please login." });
  } catch (err) {
    res.render("register", { message: "Registration failed. Try again." });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

exports.bookAppointment = (req, res) => {
  const { service, date } = req.body;
  const user = req.session.user;
  db.prepare("INSERT INTO appointments (user_id, service, date, status) VALUES (?, ?, ?, ?)").run(user.id, service, date, "pending");
  res.redirect("/dashboard");
};

exports.cancelAppointment = (req, res) => {
  const { id } = req.body;
  db.prepare("DELETE FROM appointments WHERE id = ?").run(id);
  res.redirect("/dashboard");
};

exports.addService = (req, res) => {
  const { name, price, duration } = req.body;
  db.prepare("INSERT INTO services (name, price, duration) VALUES (?, ?, ?)").run(name, price, duration);
  res.redirect("/dashboard");
};

exports.deleteService = (req, res) => {
  const { id } = req.body;
  db.prepare("DELETE FROM services WHERE id = ?").run(id);
  res.redirect("/dashboard");
};