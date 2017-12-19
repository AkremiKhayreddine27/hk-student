import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventService } from './../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddCalendarEventComponent implements OnInit {


  public isSaving = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2)]],
      startTime: [{hour : moment().hour(), minute: 0}, Validators.required],
      endTime: [{hour : moment().add(1, 'hour').hour(), minute: 0}, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });
  }

  addEvent({value, valid}) {
    if (this.form.valid) {
      this.isSaving = true;
      this.eventService.store({
        title: this.form.get('title').value,
        startTime: moment(this.form.get('startDate').value)
        .hour(this.form.get('startTime').value.hour)
        .minute(this.form.get('startTime').value.minute).toDate(),
        endTime: moment(this.form.get('endDate').value)
        .hour(this.form.get('endTime').value.hour)
        .minute(this.form.get('endTime').value.minute).toDate(),
        color: '#716ACA',
        dayId: 7
      }).then(event => {
        this.router.navigateByUrl('/calendar');
      });
    }else {
      this.isSaving = false;
    }
  }

}
