# SSU-Scam-Api
unofficial ssu smart campus api

# Description
scam api는 비공식적인 숭실대 스마트 캠퍼스 API입니다

# Table of Contents
## API
   - [인증](#인증)
       * [로그인](#로그인)
       * [로그아웃](#로그아웃)
   - [일정](#일정)
       * [일정 목록 조회](#일정-목록-조회)
 
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

## 일정
### 일정 목록 조회
```javascript
function getSchedules (scheduleUrl: string, cookie: Cookie, option: ScheduleExportOption): Promise<CalendarResponse> {
    ...
}

// example
getSchedules('http://myclass.ssu.ac.kr/calendar/export.php', cookie, { event: ScheduleEvent.ALL, period: SchedulePeriod.WEEKNOW })
    .then(res => doWhateverYouWantoWith(res))
```

일정을 가져오는 api입니다.

event와 period 옵션을 꼭 전달해야합니다. 

event

|   | 값 | 설명 |
|---|----------------|------------------|
| ALL  |      'all'          |        모든 일정          |
| COURSES  |   'courses'             |        강좌 관련 일정          |

period

|   | 깂 | 설명 |
|---|----------------|------------------|
| WEEKNOW  |       'weeknow'         |          이번주(월-일)        |
|  MONTHNOW |       'monthnow'         |           이번달       |
|  RECENTUPCOMING |    'recentupcoming'            |      지금부터 2달            |
| CUSTOM  |      'custom'          |        이번주(월-금)          |
