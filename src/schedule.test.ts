import login from './auth/login';
import getSchedules from './schedule';
import { ScheduleEvent, SchedulePeriod } from './type';
import { GET_SCHEDULES_URL, LOGIN_URL, testAuth } from './config';

test('test get schedules', () => {
  return login(testAuth)
    .then((cookie) => getSchedules(cookie, { event: ScheduleEvent.COURSES, period: SchedulePeriod.WEEKNOW }))
    .then((res) => expect(res).not.toBeUndefined());
});
