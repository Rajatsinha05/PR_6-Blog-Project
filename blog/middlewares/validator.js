exports.validatorData = (req, res, next) => {
  let { title, content, image } = req.body;
  if (title && content && image) {
    next();
  } else {
    res.status(400).send("All fields are required");
  }
};
