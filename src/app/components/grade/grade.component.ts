import { Component, OnInit, Input } from '@angular/core';
import { GradesService } from '../../services/grades.service';
import { Router } from '@angular/router';
import {MatDialog } from '@angular/material';
import { ConfirmeDeleteGradeComponent } from './../confirme-delete-grade/confirme-delete-grade.component';


@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  @Input() grade: any;
  public students: any[];

  constructor(public dialog: MatDialog, public router: Router, public gradeService: GradesService) { }

  ngOnInit() {
    this.gradeService.getStudents(this.grade).then(students => {
      this.students = students._embedded.students;
    });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmeDeleteGradeComponent, {
      width: '350px',
      data: { grade: this.grade }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  delete() {
    this.gradeService.destroy(this.grade.id).then(() => {
      this.router.navigateByUrl('');
    });
  }

}
