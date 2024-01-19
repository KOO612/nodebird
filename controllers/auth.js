const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    // 입력한 이메일이 기존에 있는지 중복 여부 조회
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      // true 라면 회원가입 페이지로 돌려 보내고 에러 쿼리스트링 처리
      return res.redirect('/join?error=exist');
    }
    // 비밀번호 bcrypt 암호화 hash 메서드
    const hash = await bcrypt.hash(password, 12);

    // 중복 x -> 생성
    await User.create({
      email,
      nick,
      password: hash,
    });
    // 가입후 root 화면
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  // 로그인 요청 시 authenticate 미들웨어 로그인 전략 수행
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};
