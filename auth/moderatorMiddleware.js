const user = require("../models/userModel.js");

module.exports = (req, res, next) => {
  const id = req.headers.auth0id;

  if (id) {
    user.getUserByAuthId(id).then(response => {
      if (!response) {
        res.status(401).json({ message: "You are not authorized" });
      } else {
        console.log("In the .then!", response);
        if (response.role === "moderator") {
          console.log("It worked!");
          next();
        } else {
          res.status(401).json({ message: "You are not authorized moderator" });
        }
      }
    });
  } else {
    res
      .status(500)
      .json({ message: "Something went wrong, but it was succesful" });
  }
};