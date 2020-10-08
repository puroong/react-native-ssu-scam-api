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

export interface ScheduleExportForm {
  sesskey: string;
  _qf__core_calendar_export_form: number;
  'events[exportevents]': ScheduleEvent;
  'period[timeperiod]': SchedulePeriod;
  export: SchduleExportAction
}

export interface ScheduleExportOption {
  event: ScheduleEvent;
  period: SchedulePeriod;
}

export enum ScheduleEvent {
  ALL= 'all',
  COURSES = 'courses',
}

export enum SchedulePeriod {
  WEEKNOW = 'weeknow',
  MONTHNOW = 'monthnow',
  RECENTUPCOMING = 'recentupcoming',
  CUSTOM = 'custom'
}

export enum SchduleExportAction {
  EXPORT = '내보내기',
  GENERATEURL = '일정 URL 불러오기'
}