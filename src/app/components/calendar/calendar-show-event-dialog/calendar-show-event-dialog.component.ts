import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-calendar-show-event-dialog',
  templateUrl: './calendar-show-event-dialog.component.html',
  styleUrls: ['./calendar-show-event-dialog.component.scss']
})
export class CalendarShowEventDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CalendarShowEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
