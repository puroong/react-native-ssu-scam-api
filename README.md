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
   - [강의](#강의)
       * [강의 목록 조회](#강의-목록-조회)
 
 ## 인증
 ### 로그인
```javascript
function login(loginForm: LoginForm): Promise<Cookie> {
    ...
}

// example
login({ username: '201XXXX', password: 'XXXXXXX' })
    .then(cookie => doWhateverYouWantWith(cookie));
```

로그인 api입니다.

로그인에 성공하면 Cookie를 반환하는데 사용자 인증이 필요한 api를 호출할 때 사용되므로 별도로 저장해야 합니다.

### 로그아웃
```javascript
function logout(cookie: Cookie): Promise<void> {
    ...
}

// example
logout(cookie)
    .then(() => doWhateverYouWant());
```

로그아웃 api입니다.

반드시 로그아웃할 cookie를 전달해줘야합니다.

## 일정
### 일정 목록 조회
```javascript
function getSchedules (cookie: Cookie, option: ScheduleExportOption): Promise<CalendarResponse> {
    ...
}

// example
getSchedules(cookie, { event: ScheduleEvent.ALL, period: SchedulePeriod.WEEKNOW })
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

## 강의
### 강의 목록 조회
```javascript
function getCourses(cookie: Cookie): Promise<Course[]> {
    ...
}

// example
getCourses(cookie)
    .then(res => doWhateverYouWantoWith(res))
```

현 학기에 수강하고 있는 강의 목록을 조회하는 api입니다.

Course의 구조는 아래와 같습니다.
```javascript
Course {
    id: Number, // 강의 고유 id
    title: String, // 강의 제목
    professor: String, // 교수
    tags: CourseTag[] // 교과, 학부와 같은 태그
}

CourseTag {
    name: String // 태그명
}
```
