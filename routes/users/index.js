var express = require("express");
var router = express.Router();
var user = require("../../controllers/usersController");

router.get("/", function(req, res) {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("index", { message: "" });
});

router.post("/", user.authenticate);
router.get("/register", user.viewRegister);
router.post("/register", user.registerUser);
router.get("/dashboard", user.renderDashboard);
router.post("/book-appointment", user.bookAppointment);
router.post("/cancel-appointment", user.cancelAppointment);
router.post("/add-service", user.addService);
router.post("/delete-service", user.deleteService);
router.get("/logout", user.logout);

module.exports = router;
