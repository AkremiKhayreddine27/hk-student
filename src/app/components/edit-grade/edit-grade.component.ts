import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradesService } from './../../services/grades.service';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.scss']
})
export class EditGradeComponent implements OnInit {

  public id: number;
  public grade: any;

  constructor(public router: Router, public route: ActivatedRoute, public gradeService: GradesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.fetchGrade();
  }

  fetchGrade() {
    this.gradeService.find(this.id).then(student => {
      this.grade = student;
    });
  }

  updateGrade({value, valid}) {
    if (valid) {
      this.gradeService.update(this.grade.id, {
        name: value.name,
      }).then(response => {
        this.router.navigateByUrl('/grades');
      });
    }
  }

}
