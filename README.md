# Scam-Api
unofficial smart campus api

# Description
scam api는 비공식적인 스마트 캠퍼스 API입니다

* [스마트 캠퍼스란?](https://m.blog.naver.com/PostView.nhn?blogId=ewhacism&logNo=50194143571&proxyReferer=https:%2F%2Fwww.google.com%2F)

본 라이브러리는 숭실대학교 스마트 캠퍼스를 대상으로 테스트를 진행하였습니다.

# Table of Contents
## API
   - [인증](#인증)
       * [로그인](#로그인)
       * [로그아웃](#로그이웃)

 
 ## 인증
 ### 로그인
```javascript
function login(loginUrl: string, loginForm: LoginForm): Promise<Cookie> {
    ...
}

// example
login('http://myclass.ssu.ac.kr/login/index.php', { username: '201XXXX', password: 'XXXXXXX' })
    .then(cookie => doWhateverYouWantWith(cookie));
```

로그인 api입니다.

로그인에 성공하면 Cookie를 반환하는데 사용자 인증이 필요한 api를 호출할 때 사용되므로 별도로 저장해야 합니다.

### 로그아웃
```javascript
function logout(mainUrl: string, cookie: Cookie): Promise<void> {
    ...
}

// example
logout('http://myclass.ssu.ac.kr', cookie)
    .then(() => doWhateverYouWant());
```

로그아웃 api입니다.

반드시 로그아웃할 cookie를 전달해줘야합니다.