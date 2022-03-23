import { Injectable } from '@angular/core';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import {
    addDays,
    startOfHour,
    addHours,
    subHours,
    setHours,
    subMinutes,
    addMinutes,
    startOfDay,
    setMinutes,
    format,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';

@Injectable()
export class AppService {

    root = 'https://605c94c36d85de00170da8b4.mockapi.io';
    constructor(
        private _http: HttpClient
    ) { }

    getStationsData(): Observable<any> {
        return this._http.get(this.root + '/stations')
    }
    getEvents(actions: CalendarSchedulerEventAction[], bookings?): Promise<CalendarSchedulerEvent[]> {
       
        let events = [];
        if (bookings && bookings.length) {
            events = bookings.map(e => {
                let obj = {
                    id: e.id,
                    start: new Date(moment.utc(e.startDate).local().format('YYYY-MM-DD HH:mm:ss')),
                    end: new Date(moment.utc(e.endDate).local().format('YYYY-MM-DD HH:mm:ss')),
                    title: e.customerName,
                    content: 'roadsurfer station booking',
                    color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
                    actions: actions,
                    status: 'ok' as CalendarSchedulerEventStatus,
                    isClickable: true,
                    isDisabled: false,
                    draggable: true,
                    resizable: {
                        beforeStart: true,
                        afterEnd: true
                    }
                }
                return obj;
            })
        }

        return new Promise(resolve => setTimeout(() => resolve(events), 3000));
    }
}
