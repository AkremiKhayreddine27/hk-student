import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as dateFns from 'date-fns';

import { EventService } from './../../services/event.service';

import { MatDialog } from '@angular/material';
import { CalendarShowEventDialogComponent } from './calendar-show-event-dialog/calendar-show-event-dialog.component';


import { CalendarEvent, Calendar } from 'ngx-calendar';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view = 'week';
  locale = 'fr';

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  calendars: Calendar[] = [];
  viewDate: Date = new Date();

  constructor(public dialog: MatDialog, public eventService: EventService, private http: Http) { }

  ngOnInit() {
    this.fetchEvents();
  }

  updateCalendarEvents() {

  }

  fetchEvents() {
    this.eventService.all().then(events => {
      this.calendars.push({
        id: 1,
        color: '#716ACA',
        display: true,
        events: events.map(e => {
          let start = moment()
            .hour(moment(e.startTime).hour())
            .minute(moment(e.startTime).minute())
            .day(e.dayId)
            .month(moment().month())
            .year(moment().year()).toDate();
          let end = moment()
            .hour(moment(e.endTime).hour())
            .minute(moment(e.endTime).minute())
            .day(e.dayId)
            .month(moment().month())
            .year(moment().year())
            .toDate();
          if (dateFns.startOfWeek(new Date()) > start) {
            start = moment(start).add(1, 'month').toDate();
            end = moment(end).add(1, 'month').toDate();
          }
          if (dateFns.endOfWeek(new Date()) < start) {
            start = moment(start).subtract(1, 'month').toDate();
            end = moment(end).subtract(1, 'month').toDate();
          }
          const event: CalendarEvent = {
            id: e.id,
            color: e.color ? e.color : '#716ACA',
            start: start,
            end: end,
            title: e.title,
            meta: {
              id: e.id
            }
          };
          return event;
        }),
        isLocal: true,
        name: 'local',
        url: ''
      });
      this.refresh.next();
    });
  }

  eventClicked(event) {
    const dialogRef = this.dialog.open(CalendarShowEventDialogComponent, {
      width: '350px',
      data: {
        event: event
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(result.eventId);
      }
    });
  }

  delete(id) {
    this.eventService.destroy(id).then(() => {
      this.fetchEvents();
      this.refresh.next();
    });
  }

}
