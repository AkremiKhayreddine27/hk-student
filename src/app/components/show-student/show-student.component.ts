import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { MonthService } from './../../services/month.service';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss']
})
export class ShowStudentComponent implements OnInit {

  public studentId: number;
  public student: any;
  public months: any[];
  showLoading = true;

  constructor(public route: ActivatedRoute, public studentService: StudentService, public monthService: MonthService) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.params['id'];
    this.studentService.find(this.studentId).then(student => {
      this.student = student;
      this.studentService.getMonths(this.student).then(months => {
        this.months = months._embedded.months;
        for (const month of this.months) {
          month.startDate = moment(month.startDate).format('DD-MM-YYYY');
          if (month.endDate) {
            month.endDate = moment(month.endDate).format('DD-MM-YYYY');
          }
        }
      }).catch(error => {
        this.showLoading = false;
      });
    }).catch(error => {
      this.showLoading = false;
    });
  }

  updateMonth(id, event) {
    this.monthService.update(id, {
      payed: event.checked
    }).subscribe();
  }

}
