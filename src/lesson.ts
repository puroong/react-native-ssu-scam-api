import axios from 'axios';
import { load } from 'react-native-cheerio';
import {
  Cookie,
  LessonAttendance,
  LessonAttendanceType,
  LessonLink,
  Lesson,
  EMPTY_STRING,
  EMPTY_LINK,
  ATTENDANCE_PRESENT,
  ATTENDANCE_LATE,
} from './type';
import { GET_LESSON_ATTENDANCES_URL, GET_LESSON_LINKS_URL } from './config';

export default function getLessons(cookie: Cookie, courseId: number): Promise<Lesson[]> {
  let lessonAttendances: LessonAttendance[] = [];
  let lessonLinks: LessonLink[] = [];

  return getLessonAttendances(cookie, courseId)
    .then((res) => {
      lessonAttendances = res;
    })
    .then(() => getLessonLinks(cookie, courseId))
    .then((res) => {
      lessonLinks = res;
    })
    .then(() => mergeLessonAttendanceAndLessonLink(lessonAttendances, lessonLinks));
}

function getLessonAttendances(cookie: Cookie, courseId: number): Promise<LessonAttendance[]> {
  const getLessonAttendancesUrl = getLessonAttendancesUrlFor(courseId);

  return axios.get(getLessonAttendancesUrl, { headers: { Cookie: cookie.toString() } }).then((res) => {
    const $ = load(res.data);
    const lessonAttendances = parseLessonAttendances($);

    return lessonAttendances;
  });
}

function getLessonAttendancesUrlFor(courseId: number): string {
  return `${GET_LESSON_ATTENDANCES_URL}?id=${courseId}`;
}

function parseLessonAttendances($: cheerio.Root): LessonAttendance[] {
  const lessons: LessonAttendance[] = [];
  const lessonTableCheerio = load($('tbody')[1]).root();
  const lessonsCheerio = lessonTableCheerio.find('tr');

  let latestLessonWeek = -1;

  function updateLatestLessonWeek(lessonCheerio: cheerio.Cheerio) {
    const textCenterCheerio = lessonCheerio.find('td.text-center');

    if (isLessonWeekDataExist(textCenterCheerio)) {
      const lessonWeek = textCenterCheerio.first().text();
      latestLessonWeek = parseInt(lessonWeek, 10);
    }
  }

  lessonsCheerio.each((index: number, lessonElement: cheerio.Element) => {
    const lessonCheerio = $(lessonElement);

    updateLatestLessonWeek(lessonCheerio);

    const week = latestLessonWeek;
    const title = parseLessonAttendanceTitle(lessonCheerio);
    const attendance = parseLessonAttendance(lessonCheerio);
    const link = EMPTY_LINK;

    lessons.push({
      week,
      title,
      attendance,
    });
  });

  return lessons;
}

function parseLessonAttendanceTitle(lessonCheerio: cheerio.Cheerio): string {
  const lessonTitleCheerio = lessonCheerio.find('td.text-left');
  const lessonTitle = lessonTitleCheerio.text().trim();

  return lessonTitle;
}

function parseLessonAttendance(lessonCheerio: cheerio.Cheerio): LessonAttendanceType {
  const textCenterCheerio = lessonCheerio.find('td.text-center');
  let parsedLessonAttendance = EMPTY_STRING;

  if (isLessonWeekDataExist(textCenterCheerio))
    parsedLessonAttendance = parseLessonAttendanceWhenWeekDataExist(textCenterCheerio);
  else parsedLessonAttendance = parseLessonAttendanceWhenWeekDataNotExist(textCenterCheerio);

  return toAttendanceEnum(parsedLessonAttendance);
}

function isLessonWeekDataExist(textCenterCheerio: cheerio.Cheerio): boolean {
  const firstTextCenterCheerio = textCenterCheerio.first();
  const firstTextCenterText = firstTextCenterCheerio.text().trim();

  const regex = new RegExp(/^[0-9]+$/g);
  const isFirstTextCenterTextNumber = firstTextCenterText.match(regex) !== null;

  return isFirstTextCenterTextNumber;
}

function parseLessonAttendanceWhenWeekDataExist(textCenterCheerio: cheerio.Cheerio): string {
  const lessonAttendanceCheerio = textCenterCheerio.next().next().next().next();
  const lessonAttendance = lessonAttendanceCheerio.text();

  return lessonAttendance;
}

function parseLessonAttendanceWhenWeekDataNotExist(textCenterCheerio: cheerio.Cheerio): string {
  const lessonAttendanceCheerio = textCenterCheerio.next().next();
  const lessonAttendance = lessonAttendanceCheerio.text();

  return lessonAttendance;
}

function toAttendanceEnum(parsedLessonAttendance: string): LessonAttendanceType {
  let enumValue;
  if (parsedLessonAttendance === ATTENDANCE_PRESENT) enumValue = LessonAttendanceType.PRESENT;
  else if (parsedLessonAttendance === ATTENDANCE_LATE) enumValue = LessonAttendanceType.LATE;
  else enumValue = LessonAttendanceType.ABSENT;

  return enumValue;
}

function getLessonLinks(cookie: Cookie, courseId: number): Promise<LessonLink[]> {
  const getLessonLinksUrl = getLessonLinksUrlFor(courseId);

  return axios.get(getLessonLinksUrl, { headers: { Cookie: cookie.toString() } }).then((res) => {
    const $ = load(res.data);
    const lessonLinks = parseLessonLinks($);

    return lessonLinks;
  });
}

function getLessonLinksUrlFor(courseId: number): string {
  return `${GET_LESSON_LINKS_URL}?id=${courseId}`;
}

function parseLessonLinks($: cheerio.Root): LessonLink[] {
  let lessonLinksCheerio = $('div.total_sections div.activityinstance');
  lessonLinksCheerio = lessonLinksCheerio.filter((index: number, lessonLinkElement: cheerio.Element) => {
    const lessonLinkCheerio = $(lessonLinkElement);

    return isLesson(lessonLinkCheerio);
  });

  const lessonLinks: LessonLink[] = [];

  lessonLinksCheerio.each((index: number, lessonLinkElement: cheerio.Element) => {
    const lessonLinkCheerio = $(lessonLinkElement);

    const title = parseLessonLinkTitle(lessonLinkCheerio);
    const link = parseLessonLink(lessonLinkCheerio);

    lessonLinks.push({
      title,
      link,
    });
  });
  return lessonLinks;
}

function isLesson(lessonLinkCheerio: cheerio.Cheerio): boolean {
  // 강의면 onclick 속성이 window.open~이고
  // 과제면 onclick 속성이 없다
  const lessonLinkOnClick = lessonLinkCheerio.find('a').attr('onclick');

  return lessonLinkOnClick !== EMPTY_STRING && lessonLinkOnClick !== undefined;
}

function parseLessonLinkTitle(lessonLinkCheerio: cheerio.Cheerio): string {
  lessonLinkCheerio.find('span.accesshide').remove();

  const lessonLinkTitleCheerio = lessonLinkCheerio.find('span.instancename');
  const lessonLinkTitle = lessonLinkTitleCheerio.text().trim();

  return lessonLinkTitle;
}

function parseLessonLink(lessonLinkCheerio: cheerio.Cheerio): string {
  const lessonLinkOnClick = lessonLinkCheerio.find('a').attr('onclick');

  if (lessonLinkOnClick === undefined || lessonLinkOnClick === EMPTY_STRING)
    throw new Error('lesson link does not exist');
  const lessonLink = extractLessonLinkFrom(lessonLinkOnClick);

  return lessonLink;
}

function extractLessonLinkFrom(onclick: string): string {
  const removeWindowOpen = onclick.split("window.open('")[1];
  const removeRestArguments = removeWindowOpen.split("',")[0];

  const lessonLink = removeRestArguments;

  return lessonLink;
}

function mergeLessonAttendanceAndLessonLink(
  lessonAttendances: LessonAttendance[],
  lessonLinks: LessonLink[],
): Lesson[] {
  const lessons: Lesson[] = [];

  lessonLinks.forEach((lessonLink) => {
    const lessonAttendance = lessonAttendances.find(
      (_lessonAttendance) => lessonLink.title === _lessonAttendance.title,
    );

    if (lessonAttendance === undefined) throw new Error('Cannot find appropriate lesson attendance');

    lessons.push({
      week: lessonAttendance.week,
      title: lessonAttendance.title,
      link: lessonLink.link,
      attendance: lessonAttendance.attendance,
    });
  });

  return lessons;
}
