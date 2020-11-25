import getLessons from './lesson';
import getCourses from './course';
import getSchedules from './schedule';
import auth from './auth';

export default {
  getLessons,
  getCourses,
  getSchedules,
  ...auth,
};
