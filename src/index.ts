import getLessons from './lesson';
import getCourses from './course';
import auth from './auth';

export default {
  getLessons,
  getCourses,
  ...auth,
};
