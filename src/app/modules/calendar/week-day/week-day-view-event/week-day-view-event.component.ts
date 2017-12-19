import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { WeekViewEvent } from './../../utils/calendar-utils';

@Component({
  selector: 'app-week-day-view-event',
  templateUrl: './week-day-view-event.component.html',
  styleUrls: ['./week-day-view-event.component.scss']
})
export class WeekDayViewEventComponent {
  @Input() weekEvent: WeekViewEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}
