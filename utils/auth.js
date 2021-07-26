const withAuth = (req, res, next) => {
  //middleware to make sure that the user is signed in
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
