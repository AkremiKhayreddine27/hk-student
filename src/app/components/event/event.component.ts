import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: any;

  grades: any[];

  constructor(public http: Http) { }

  ngOnInit() {
    this.event.startTime = moment(this.event.startTime).format('HH:mm');
    this.event.endTime = moment(this.event.endTime).format('HH:mm');
    this.http.get(this.event._links.grades.href).map(response => response.json()).toPromise().then(grades => {
        this.grades = grades._embedded.grades;
    });
  }

}
