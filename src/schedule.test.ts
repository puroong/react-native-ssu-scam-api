import login from "./auth/login";
import getSchedules from "./schedule";
import {ScheduleEvent, SchedulePeriod} from "./type";

test('test get schedules', () => {
    return login('http://myclass.ssu.ac.kr/login/index.php', { username: '20160380', password: 'karkar55@' })
        .then(cookie => getSchedules('http://myclass.ssu.ac.kr/calendar/export.php', cookie, { event: ScheduleEvent.COURSES, period: SchedulePeriod.WEEKNOW }))
        .then(res => expect(res).not.toBeUndefined())
})