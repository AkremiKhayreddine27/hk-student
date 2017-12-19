import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DayService } from '../../services/day.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: any[];
  public day: any;
  showLoading = true;

  days = ['Dimenche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  constructor(public http: Http, public eventService: EventService, public dayService: DayService) { }

  ngOnInit() {
    const today = new Date().getDay();
      this.eventService.findByDay(today)
      .then(events => {
        this.events = events._embedded.events;
      }).catch((error: Error) => {
        this.showLoading = false;
      });
  }


}
