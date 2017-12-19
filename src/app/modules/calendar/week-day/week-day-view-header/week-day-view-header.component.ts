import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent, WeekDay } from './../../utils/calendar-utils';
@Component({
  selector: 'app-week-day-view-header',
  templateUrl: './week-day-view-header.component.html',
  styleUrls: ['./week-day-view-header.component.scss']
})
export class WeekDayViewHeaderComponent {

  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output()
  dayHeaderClicked: EventEmitter<{ day: WeekDay }> = new EventEmitter<{
    day: WeekDay;
  }>();

  @Output()
  eventDropped: EventEmitter<{
      event: CalendarEvent;
      newStart: Date;
    }> = new EventEmitter<{ event: CalendarEvent; newStart: Date }>();

}
