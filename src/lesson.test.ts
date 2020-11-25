import login from './auth/login';
import getCourses from './course';
import getLessons from './lesson';
import { testAuth } from './config';
import { Cookie } from './type';

test('test get lessons', () => {
  let gCookie: Cookie;
  return login(testAuth)
    .then((cookie) => {
      gCookie = cookie;
      return getCourses(cookie);
    })
    .then((courses) => getLessons(gCookie, courses[1].id))
    .then((res) => expect(res).not.toBeUndefined());
});
