import login from './auth/login';
import getCourses from './course';
import { testAuth } from './config';

test('test get courses', () => {
  return login(testAuth)
    .then((cookie) => getCourses(cookie))
    .then((res) => expect(res).not.toBeUndefined());
});
