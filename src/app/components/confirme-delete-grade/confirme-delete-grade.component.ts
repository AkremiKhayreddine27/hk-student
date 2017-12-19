import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirme-delete-grade',
  templateUrl: './confirme-delete-grade.component.html',
  styleUrls: ['./confirme-delete-grade.component.scss']
})
export class ConfirmeDeleteGradeComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmeDeleteGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  delete = true;

    onNoClick(): void {
    this.dialogRef.close();
  }

}
