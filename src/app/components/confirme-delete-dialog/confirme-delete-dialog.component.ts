import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-confirme-delete-student-dialog',
    templateUrl: 'confirme-delete-student-dialog.html',
    styleUrls: ['./confirme-delete-student-dialog.scss']
  })
export class ConfirmeDeleteDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<ConfirmeDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    delete = true;

      onNoClick(): void {
      this.dialogRef.close();
    }

}
