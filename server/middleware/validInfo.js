module.exports = function(req, res, next) {
  const { userEmail, username, userPassword } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    //console.log(!userEmail.length);
    if (![userEmail, username, userPassword].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(userEmail)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![userEmail, userPassword].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(userEmail)) {
      return res.json("Invalid Email");
    }
  }

  next();
};