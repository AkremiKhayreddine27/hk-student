import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog } from '@angular/material';
import { ConfirmeDeleteDialogComponent } from './../confirme-delete-dialog/confirme-delete-dialog.component';
import { map } from 'rxjs/operators/map';


import { Moment } from 'moment';
import * as moment from 'moment';


import { StudentService } from '../../services/student.service';
import { MonthService } from '../../services/month.service';

import { UtilitiesService } from './../../services/utilities.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: any;
  months: any[];
  lastMonth: any;
  lastMonthSessions: any[];
  nbrLastMonthSession = 0;
  nonPayedMonths = 0;

  public headColor = '#8E24AA';

  public color = ['#D50000', '#0B8043', '#039BE5', '#8E24AA'];

  constructor(
    public utilities: UtilitiesService,
    public dialog: MatDialog,
    public router: Router,
    public studentService: StudentService,
    public monthService: MonthService) { }

  ngOnInit() {
    this.randomcolor();
    moment.locale('fr');
    this.student.startsAt = moment(this.student.startsAt).add(1, 'days').fromNow();
    this.studentService.getMonths(this.student).then(months => {
      this.months = months._embedded.months;
      for (const month of this.months){
        if (!month.payed && month.endDate) {
          this.nonPayedMonths++;
        }
      }
    });
    this.studentService.findLastMonth(this.student).then(month => {
      this.lastMonth = month;
      this.monthService.getSessions(month).then(sessions => {
        this.lastMonthSessions = sessions._embedded.sessions;
        this.lastMonthSessions.forEach(session => {
          if (session.presence === true) {
            this.nbrLastMonthSession ++;
          }
        });
      });
    });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmeDeleteDialogComponent, {
      width: '350px',
      data: { student: this.student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  randomcolor () {
    this.headColor = this.color[this.randomIntFromInterval(0, 3)];
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  delete() {
    this.studentService.destroy(this.student.id).then(() => {
      this.router.navigateByUrl('/grades');
    });
  }

}

