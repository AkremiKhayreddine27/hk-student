import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  public id: number;
  public student: any;

  constructor(public route: ActivatedRoute, public studentService: StudentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.fetchStudent();
  }

  fetchStudent() {
    this.studentService.find(this.id).then(student => {
      this.student = student;
    });
  }

  updateStudent({value, valid}) {
    if (valid) {
      this.studentService.update(this.student.id, {
        firstName: value.firstname,
        lastName: value.lastname,
        startsAt: value.startsAt
      }).then(response => {
        console.log(response);
      });
    }
  }

}
