import { Component, OnInit } from '@angular/core';
import { GradesService } from '../../services/grades.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  public grades: any[];
  showLoading = true;

  constructor(public gradesService: GradesService) { }

  ngOnInit() {
    this.gradesService.all().then(grades => {
      this.grades = grades._embedded.grades;
    }).catch((error: Error) => {
      this.showLoading = false;
    });
  }

}
