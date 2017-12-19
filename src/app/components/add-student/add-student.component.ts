import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';
import { StudentService } from '../../services/student.service';
import { MonthService } from '../../services/month.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  public gradeId: number;

  firstname: string;
  lastname: string;
  startsAt: any;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Moment>;
  isSaving = false;
  isDisabled = false;

  constructor(
    public route: ActivatedRoute,
    public studentService: StudentService,
    public monthService: MonthService,
    private router: Router) { }

  ngOnInit() {
    moment.locale('fr');
    this.gradeId = this.route.snapshot.params['id'];
    this.picker.selectedChanged.subscribe((newDate: Moment) => {
        this.startsAt = newDate.format('YYYY-MM-DD');
        const testDate = new Date(this.startsAt);
        this.startsAt = testDate.toLocaleDateString();
        console.log(testDate.toLocaleDateString());
      }, (error) => {
        throw Error(error);
      }
    );
  }

  addStudent({value, valid}) {
    this.isSaving = true;
    if (valid) {
      this.studentService.store({
        firstName: this.firstname,
        lastName: this.lastname,
        startsAt: this.startsAt
      }).then(student => {
        this.monthService.store({
          'startDate': this.startsAt,
          'number': 1,
          'maxNbrSessions': 12,
          'payed': false
        }).then(month => {
          this.studentService.associateGrade(student.id, this.gradeId).subscribe();
          this.monthService.associateStudent(month.id, student.id).subscribe();
          this.router.navigateByUrl('/grades/' + this.gradeId);
        });
      });
    }else {
      this.isSaving = false;
      alert('invalid');
    }
  }

}
