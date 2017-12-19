import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { WeekViewEvent } from './../../utils/calendar-utils';
@Component({
  selector: 'app-week-view-event',
  templateUrl: './week-view-event.component.html',
  styleUrls: ['./week-view-event.component.scss']
})
export class WeekViewEventComponent {
  @Input() weekEvent: WeekViewEvent;

  @Input() tooltipPlacement: string;

  @Input() tooltipAppendToBody: boolean;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();
}
