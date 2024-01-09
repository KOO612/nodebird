const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // 로그인 시 실행
  // req.session에 어떤 데이터를 저장할지 정하는 메서드
  passport.serializeUser((user, done) => {
    // done 첫번째 -> 에러 발생할 때 사용
    // 두번째 -> 저장하고 싶은 데이터
    // 전부 저장하면 용량이 커지니 사용자 id만 저장
    done(null, user.id);
  });
  // 각 요청마다 실행
  // serializeUser done 두번째 인수 데이터가 매개변수가 됨
  // 조회한 정보를 req.user 에 저장, 로그인한 사용자 정보를 가져올수 있음
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  kakao();
};
