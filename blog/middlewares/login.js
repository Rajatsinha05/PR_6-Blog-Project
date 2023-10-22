const isLogin = (req, res, next) => {
  let { id } = req.cookies;
  if (id) {
    next();
  } else {
    console.log("hiting");
    res.redirect("/user/login");
  }
};

module.exports = isLogin;
