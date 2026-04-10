exports.isAuthenticated = function (req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.render('index', { message: "" });
};