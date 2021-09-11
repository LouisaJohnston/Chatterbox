const router = require("express").Router();

router.use("/messages", require("./messages"));
router.use("/conversations", require("./conversations"));
router.use("/users", require("./users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  console.log(error)
  next(error);
});

module.exports = router;
