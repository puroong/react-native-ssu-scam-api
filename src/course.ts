import axios from 'axios';
import { Cookie, Course, CourseTag } from "./type";
import { load } from 'cheerio';
import { GET_COURSES_URL } from './config';

export default function getCourses(cookie: Cookie) {
    return axios
        .get(GET_COURSES_URL, { headers: { Cookie: cookie.toString() }})
        .then(res => {
            const $ = load(res.data);

            const courses = parseCourses($);
            return courses;
        })
}

function parseCourses($: cheerio.Root): Course[] {
    const courseElements: cheerio.Cheerio = $('li.course_label_re');

    const courses: Course[] = []
    courseElements.map((index: Number, courseElement: cheerio.Element) => {
        const courseCheerio = $(courseElement);

        const id: Number = parseCourseId(courseCheerio);
        const title: String = parseCourseTitle(courseCheerio);
        const professor: String = parseCourseProfessor(courseCheerio);
        const tags: CourseTag[] = parseCourseTags(courseCheerio);

        courses.push({
            id,
            title,
            professor,
            tags
        });
    });

    return courses;
}

function parseCourseId(courseCheerio: cheerio.Cheerio): Number {
    const courseLinkCheerio = courseCheerio.find('a.course_link')
    const courseLink = courseLinkCheerio.attr('href');

    if(courseLink === undefined) throw new Error("Course Link Not Found");
    const courseId = courseLink.split("?id=")[1];

    return parseInt(courseId);
}

function parseCourseTitle(courseCheerio: cheerio.Cheerio): String {
    const courseTitleCheerio = courseCheerio.find('div.course-title > h3');
    const title = courseTitleCheerio.text().trim();

    return title;
}

function parseCourseProfessor(courseCheerio: cheerio.Cheerio): String {
    const courseProfessorCheerio = courseCheerio.find('p.prof');
    const courseProfessor = courseProfessorCheerio.text();

    return courseProfessor;
}

function parseCourseTags(courseCheerio: cheerio.Cheerio): CourseTag[] {
    const courseTagsCheerio = courseCheerio.find('div.course-label');
    const courseTags: CourseTag[] = [];
    
    courseTagsCheerio.each((index: Number, courseTagElement: cheerio.Element) => {
        const courseTagCheerio = load(courseTagElement).root();
        const courseTag = courseTagCheerio.text();
        
        courseTags.push({
            name: courseTag
        });
    });

    return courseTags;
}