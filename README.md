# SSU-Scam-Api
unofficial ssu smart campus api

# Description
scam api는 비공식적인 숭실대 스마트 캠퍼스 API입니다

# Table of Contents
## API
   - [인증](#인증)
       * [로그인](#로그인)
       * [로그아웃](#로그아웃)
   - [강의](#강의)
       * [강의 목록 조회](#강의-목록-조회)
   - [수업](#수업)
       * [수업 정보 조회](#수업-정보-조회)

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
    id: number, // 강의 고유 id
    title: string, // 강의 제목
    professor: string, // 교수
    tags: CourseTag[] // 교과, 학부와 같은 태그
}

CourseTag {
    name: string // 태그명
}
```

## 수업
### 수업 정보 조회

```javascript
function getLessons(cookie: Cookie, courseId: number): Promise<Lesson[]> {
    ...
}

// example
getLessons(cookie, courseId)
    .then(res => doWhateverYouWantoWith(res))
```

courseId를 고유 id로 가진 강의의 모든 수업 정보를 조회하는 api입니다.

Lessond의 구조는 아래와 같습니다.
```javascript
Lesson {
    week: number, // 수업 주차
    title: string, // 수업 제목
    link: string, // 수업 링크 주소
    attendance: LessonAttendanceType // 출석 상태
}

enum LessonAttendanceType { PRESENT, LATE, ABSENT }
```
