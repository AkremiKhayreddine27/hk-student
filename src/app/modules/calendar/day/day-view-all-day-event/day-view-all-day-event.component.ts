import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent } from './../../utils/calendar-utils';

@Component({
  selector: 'app-day-view-all-day-event',
  templateUrl: './day-view-all-day-event.component.html',
  styleUrls: ['./day-view-all-day-event.component.scss']
})
export class DayViewAllDayEventComponent {

  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}
