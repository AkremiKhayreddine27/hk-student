import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { MonthViewDay, CalendarEvent } from '../../utils/calendar-utils';
@Component({
  selector: 'app-month-cell',
  templateUrl: './month-cell.component.html',
  styleUrls: ['./month-cell.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'cal-cell cal-day-cell',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend',
    '[class.cal-in-month]': 'day.inMonth',
    '[class.cal-out-month]': '!day.inMonth',
    '[class.cal-has-events]': 'day.events.length > 0',
    '[class.cal-open]': 'day === openDay',
    '[style.backgroundColor]': 'day.backgroundColor'
  }
})
export class MonthCellComponent {
  @Input() day: MonthViewDay;

  @Input() openDay: MonthViewDay;

  @Input() locale: string;

  @Input() tooltipPlacement: string;

  @Input() tooltipAppendToBody: boolean;

  @Input() customTemplate: TemplateRef<any>;

  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() highlightDay: EventEmitter<any> = new EventEmitter();

  @Output() unhighlightDay: EventEmitter<any> = new EventEmitter();

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
   * @hidden
   */
  onEventClick(mouseEvent: MouseEvent, calendarEvent: CalendarEvent): void {
    if (mouseEvent.stopPropagation) {
      mouseEvent.stopPropagation();
    }
    this.eventClicked.emit({ event: calendarEvent });
  }
}
