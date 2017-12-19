import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GradesService } from '../../services/grades.service';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements OnInit {

  name: string;
  isSaving = false;

  constructor(public gradeService: GradesService, private router: Router) { }

  ngOnInit() {
  }

  addGrade({value, valid}) {
    if (valid) {
      this.isSaving = true;
      this.gradeService.store({name: this.name}).then(grade => {
        this.router.navigateByUrl('/grades');
      });
    }else {
      alert('invalid');
    }
  }

}
