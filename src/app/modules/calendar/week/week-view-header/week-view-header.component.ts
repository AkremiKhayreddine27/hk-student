import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent, WeekDay } from './../../utils/calendar-utils';


@Component({
  selector: 'app-week-view-header',
  templateUrl: './week-view-header.component.html',
  styleUrls: ['./week-view-header.component.scss']
})
export class WeekViewHeaderComponent {
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
