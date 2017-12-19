import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './../../services/event.service';
import { GradesService } from './../../services/grades.service';
import { SessionService } from './../../services/session.service';
import { StudentService } from './../../services/student.service';
import { MonthService } from './../../services/month.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.scss']
})
export class ShowEventComponent implements OnInit {

  public eventId: number;
  public event: any;
  public grades: any;
  showLoading = true;
  isSaving = false;
  isDisabled = false;
  canUpdate = true;

  public presentStudents: any[] = [];

  constructor(
    public snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private router: Router,
    public eventService: EventService,
    public gradeService: GradesService,
    public sessionService: SessionService,
    public studentService: StudentService,
    public monthService: MonthService
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.eventService.find(this.eventId).then(event => {
      this.event = event;
      this.sessionService.findByDate(moment().format('YYYY-MM-DD'), this.event.startTime, this.event.endTime).then(sessions => {
        if (sessions._embedded.sessions.length > 0) {
          this.canUpdate = false;
          sessions._embedded.sessions.map(session => {
            this.sessionService.getMonth(session.id).then(month => {
              this.monthService.getStudent(month).then(student => {
                this.presentStudents.push({
                  student: student,
                  present: session.presence
                });
              });
            });
          });
        } else {
          this.eventService.getGrades(event).then(grades => {
            this.grades = grades._embedded.grades;
            for (const grade of this.grades) {
              this.gradeService.getStudents(grade).then(students => {
                grade.students = students._embedded.students;
                for (const student of grade.students){
                  this.presentStudents.push({
                    student: student,
                    present: true
                  });
                }
              }).catch(error => {
                this.showLoading = false;
              });
            }
          }).catch(error => {
            this.showLoading = false;
          });
        }
      });
    }).catch(error => {
      this.showLoading = false;
    });
  }

  save() {
    this.isDisabled = true;
    this.isSaving = true;
    for (const presentStudent of this.presentStudents){
      this.sessionService.store({
        startTime: this.event.startTime,
        endTime: this.event.endTime,
        presence: presentStudent.present,
        day: new Date()
      }).then(session => {
        this.studentService.findLastMonth(presentStudent.student).then(month => {
          this.sessionService.associateMonth(session.id, month.id)
          .toPromise().then(response => {
            this.studentService.findLastMonth(presentStudent.student).then(lastMonth => {
              this.monthService.getSessions(lastMonth).then(sessions => {
                const lastMonthSessions = sessions._embedded.sessions;
                let studentLastMonthSessionsPresent = 0;
                for (const lastMonthSession of lastMonthSessions) {
                  if (lastMonthSession.presence) {
                    studentLastMonthSessionsPresent++;
                  }
                }
                if (studentLastMonthSessionsPresent === 12) {
                  this.monthService.update(lastMonth.id, {
                    endDate: new Date()
                  }).subscribe();
                  this.monthService.store({
                    'startDate': moment().add(1, 'week').toDate(),
                    'number': 1,
                    'maxNbrSessions': 12,
                    'payed': false
                  }).then(newMonth => {
                    this.monthService.associateStudent(newMonth.id, presentStudent.student.id).subscribe();
                    this.router.navigateByUrl('');
                    this.snackBar.open('Séance ajouté avec succée ' +
                    presentStudent.student.firstName + ' ' + presentStudent.student.lastName +
                    ' a fini son mois !! il faut payé', '', {
                      duration: 10000,
                    });
                  });
                }else {
                  this.router.navigateByUrl('');
                  this.snackBar.open('Séance ajouté avec succée', '', {
                    duration: 10000,
                  });
                }
              });
            });
          });
        });
      });
    }
  }

  updatePresentStudents(id, event) {
    if (! event.checked) {
      for (const presentStudent of this.presentStudents){
        if (id === presentStudent.student.id) {
          presentStudent.present = false;
        }
      }
    }else {
      for (const presentStudent of this.presentStudents){
        if (id === presentStudent.student.id) {
          presentStudent.present = true;
        }
      }
    }
    console.log(this.presentStudents);
  }

}
