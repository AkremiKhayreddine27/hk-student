import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradesService } from '../../services/grades.service';

@Component({
  selector: 'app-show-grade',
  templateUrl: './show-grade.component.html',
  styleUrls: ['./show-grade.component.scss']
})
export class ShowGradeComponent implements OnInit {

  public gradeId: number;
  public grade: any;
  public students: any[];
  showLoading = true;

  constructor(public route: ActivatedRoute, public gradeService: GradesService) { }

  ngOnInit() {
    this.gradeId = this.route.snapshot.params['id'];
    this.gradeService.find(this.gradeId).then(grade => {
      this.grade = grade;
    }).catch(error => {
      this.showLoading = false;
    });
    this.gradeService.students(this.gradeId).then(students => {
        this.students = students._embedded.students;
    }).catch(error => {
      this.showLoading = false;
    });
  }

}
