import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GradesService } from '../../services/grades.service';
import { EventService } from '../../services/event.service';
import { DayService } from '../../services/day.service';
import * as moment from 'moment';
import { environment } from './../../../environments/environment';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  public gradesUrl: string = environment.backendBaseURL + '/grades';
  selectedDay = new FormControl('day', [
    Validators.required
  ]);
  grades = new FormControl();
  gradeList = [];
  startTime = {hour: 8, minute: 0};
  endTime = {hour: 10, minute: 0};
  public day: any;
  showLoading = true;
  isSaving = false;
  isDisabled = false;
  days= [
    { value: 1, viewValue: 'Lundi' },
    { value: 2, viewValue: 'Mardi' },
    { value: 3, viewValue: 'Mercredi' },
    { value: 4, viewValue: 'Jeudi' },
    { value: 5, viewValue: 'Vendredi' },
    { value: 6, viewValue: 'Samedi' },
    { value: 0, viewValue: 'Dimenche' }
  ];
  frDays = ['Dimenche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  public events: any[];

  constructor(
    public snackBar: MatSnackBar,
    public http: Http,
    public dayService: DayService,
    public gradesService: GradesService,
    public eventService: EventService,
    private router: Router) { }

  ngOnInit() {
    this.gradesService.all().then(grades => {
      this.gradeList = grades._embedded.grades;
    }).catch((error: Error) => {
      console.log(error.message);
    });
  }

  addEvent() {
    this.isDisabled = true;
    this.isSaving = true;
    const today = new Date().getDay();
      this.eventService.all()
      .then(events => {
        this.events = events._embedded.events;
        if (! this.existe()) {
            let gradesUri = '';
            let title = '';
            for (const grade of this.grades.value) {
              gradesUri += this.gradesUrl + '/' + grade.id + '\n';
              title += grade.name;
              title += ' ';
            }
            this.eventService.store({
              title: title,
              startTime: moment(this.startTime.hour + ':' + this.startTime.minute, 'HH:mm').toDate(),
              endTime: moment(this.endTime.hour + ':' + this.endTime.minute, 'HH:mm').toDate(),
              dayId: this.selectedDay.value,
              color: '#716ACA'
            }).then(event => {
              this.eventService.associateGrade(event.id, gradesUri).toPromise().then(() => {
                this.router.navigateByUrl('');
              });
          });
        }else {
          this.isDisabled = false;
          this.isSaving = false;
            this.snackBar.open('Vous etes déja occupé', '', {
              duration: 10000,
            });
        }
      });

  }

  existe(): boolean {
    let existe = false;
    for (const event of this.events) {
      const eventStartTime =  moment(moment(event.startTime).day(event.dayId));
      const eventEndTime = moment(moment(event.endTime).day(event.dayId));
      const startTime = moment(this.startTime).day(this.selectedDay.value);
      const endTime = moment(this.endTime).day(this.selectedDay.value);
      if (
        startTime.isBetween(eventStartTime, eventEndTime)
    ||  startTime.isSame(eventStartTime)
    ||  endTime.isBetween(eventStartTime, eventEndTime)
    ||  endTime.isSame(eventEndTime)
    ||  eventStartTime.isBetween(startTime, endTime)
    ||  eventEndTime.isBetween(startTime, endTime)) {
          existe =  true;
          break;
      }
    }
    return existe;
  }

}
