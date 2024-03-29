exports.isLoggedIn = (req, res, next) => {
  // 로그인 중이면 req.isAuthenticated() -> true
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태');
    res.redirect(`/?error=${message}`);
  }
};
