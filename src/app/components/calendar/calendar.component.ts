import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { Moment } from 'moment';
import * as moment from 'moment';

import { EventService } from './../../services/event.service';

import {MatDialog } from '@angular/material';
import { CalendarShowEventDialogComponent } from './calendar-show-event-dialog/calendar-show-event-dialog.component';


import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view = 'weekDay';
  locale = 'fr';

  refresh: Subject<any> = new Subject();

  events$: Observable<Array<CalendarEvent<{event: Event }>>>;
  viewDate: Date = new Date();

  constructor(public dialog: MatDialog, public eventService: EventService, private http: Http) { }

  ngOnInit() {
    this.fetchEvents();
  }

  updateCalendarEvents() {

  }

  fetchEvents() {
    this.events$ = this.http.get(this.eventService.url).map(response => {
      return response.json()._embedded.events.map( event => {
        if (event.dayId === 7) {
          return {
            title: event.title,
            start: moment(event.startTime).toDate(),
            end: moment(event.endTime).toDate(),
            color: {
              primary: event.color,
              secondary: event.color
            },
            meta: {
              id: event.id
            }
          };
        } else {
          return {
            title: event.title,
            start: moment(moment(event.startTime))
            .month(moment().month())
            .year(moment().year())
            .date(moment().date())
            .day(event.dayId).toDate(),
            end: moment(moment(event.endTime))
            .month(moment().month())
            .year(moment().year())
            .date(moment().date())
            .day(event.dayId).toDate(),
            color: {
              primary: event.color,
              secondary: event.color
            },
            meta: {
              id: event.id
            }
          };
        }
      });
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
