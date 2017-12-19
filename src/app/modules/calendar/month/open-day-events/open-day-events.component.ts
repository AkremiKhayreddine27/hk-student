import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CalendarEvent } from '../../utils/calendar-utils';
@Component({
  selector: 'app-open-day-events',
  templateUrl: './open-day-events.component.html',
  styleUrls: ['./open-day-events.component.scss'],
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({ height: 0, overflow: 'hidden' }),
        animate('150ms', style({ height: '*' }))
      ]),
      transition('* => void', [
        style({ height: '*', overflow: 'hidden' }),
        animate('150ms', style({ height: 0 }))
      ])
    ])
  ]
})
export class OpenDayEventsComponent {
  @Input() isOpen = false;

  @Input() events: CalendarEvent[];

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();
}
