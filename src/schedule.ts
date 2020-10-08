import axios from 'axios';
import { load } from 'cheerio';
import {CalendarResponse, parseICS} from 'node-ical';
import { stringify } from 'qs';
import {Cookie, SchduleExportAction, ScheduleExportForm, ScheduleExportOption} from "./type";

function generateSchduleExportForm($: cheerio.Root, option: ScheduleExportOption): ScheduleExportForm {
    const sesskey = $('input[name=sesskey]').attr('value');
    const _qf__core_calendar_export_form = 1;

    if(sesskey === undefined) throw new Error('sesskey not found');

    return {
        sesskey,
        _qf__core_calendar_export_form,
        'events[exportevents]': option.event,
        'period[timeperiod]': option.period,
        export: SchduleExportAction.EXPORT
    }
}

export default function getSchedules (scheduleUrl: string, cookie: Cookie, option: ScheduleExportOption): Promise<CalendarResponse> {
    return axios.get(scheduleUrl, { headers: { 'Cookie': cookie.toString() } })
        .then(res => {
            const $ = load(res.data);

            return generateSchduleExportForm($, option);
        })
        .then((schduleExportForm: ScheduleExportForm) => axios.post(scheduleUrl, stringify(schduleExportForm), { headers: { 'Cookie': cookie.toString() } }))
        .then(res => parseICS(res.data))
        .catch(err => { throw err })
}