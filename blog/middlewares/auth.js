const isAuth = (req, res, next) => {
  let { role } = req.cookies;
  if (role == "admin") {
    
    next();
  } else if (!role) {
    res.send("login first");
  } else {
    res.send("You are not authorized to access this page.");
  }
};

module.exports = isAuth;
