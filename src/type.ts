export interface LoginForm {
  username: string;
  password: string;
}

export class Cookie {
  constructor(public key: string, public value: string) {}
  toString() {
    return `${this.key}=${this.value}`;
  }
}

export interface CourseTag {
  name: string;
}

export interface Course {
  id: number;
  title: string;
  professor: string;
  tags: CourseTag[];
}

export enum LessonAttendanceType {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
}

export interface LessonAttendance {
  week: number;
  title: string;
  attendance: LessonAttendanceType;
}

export interface LessonLink {
  title: string;
  link: string;
}

export interface Lesson {
  week: number;
  title: string;
  link: string;
  attendance: LessonAttendanceType;
}

export const EMPTY_LINK = '#';
export const EMPTY_STRING = '';

export const ATTENDANCE_PRESENT = 'O';
export const ATTENDANCE_LATE = '▲';
