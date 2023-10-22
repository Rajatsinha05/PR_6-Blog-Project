const isLogin = (req, res, next) => {
  let { id } = req.cookies;
  if (id) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

module.exports = isLogin;
