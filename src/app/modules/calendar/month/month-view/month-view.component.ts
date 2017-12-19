import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject,
  TemplateRef
} from '@angular/core';

import {
  CalendarEvent,
  WeekDay,
  MonthView,
  MonthViewDay
} from './../../utils/calendar-utils';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import isSameDay from 'date-fns/is_same_day';
import setDate from 'date-fns/set_date';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import addSeconds from 'date-fns/add_seconds';
import { CalendarEventTimesChangedEvent } from '../../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../../common/calendar-utils.provider';
import { validateEvents } from '../../common/util';

@Component({
  selector: 'app-calendar-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent
implements OnChanges, OnInit, OnDestroy {
/**
 * The current view date
 */
@Input() viewDate: Date;

/**
 * An array of events to display on view.
 * The schema is available here:
 * https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
 */
@Input() events: CalendarEvent[] = [];

/**
 * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
 */
@Input() excludeDays: number[] = [];

/**
 * Whether the events list for the day of the `viewDate` option is visible or not
 */
@Input() activeDayIsOpen = false;

/**
 * An observable that when emitted on will re-render the current view
 */
@Input() refresh: Subject<any>;

/**
 * The locale used to format dates
 */
@Input() locale: string;

/**
 * The placement of the event tooltip
 */
@Input() tooltipPlacement = 'top';

/**
 * A custom template to use for the event tooltips
 */
@Input() tooltipTemplate: TemplateRef<any>;

/**
 * Whether to append tooltips to the body or next to the trigger element
 */
@Input() tooltipAppendToBody = true;

/**
 * The start number of the week
 */
@Input() weekStartsOn: number;

/**
 * A custom template to use to replace the header
 */
@Input() headerTemplate: TemplateRef<any>;

/**
 * A custom template to use to replace the day cell
 */
@Input() cellTemplate: TemplateRef<any>;

/**
 * A custom template to use for the slide down box of events for the active day
 */
@Input() openDayEventsTemplate: TemplateRef<any>;

/**
 * A custom template to use for event titles
 */
@Input() eventTitleTemplate: TemplateRef<any>;

/**
 * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
 */
@Input() weekendDays: number[];

/**
 * An output that will be called before the view is rendered for the current month.
 * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
 */
@Output()
beforeViewRender: EventEmitter<{
  header: WeekDay[];
  body: MonthViewDay[];
}> = new EventEmitter();

/**
 * Called when the day cell is clicked
 */
@Output()
dayClicked: EventEmitter<{ day: MonthViewDay }> = new EventEmitter<{
  day: MonthViewDay;
}>();

/**
 * Called when the event title is clicked
 */
@Output()
eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
  event: CalendarEvent;
}>();

/**
 * Called when an event is dragged and dropped
 */
@Output()
eventTimesChanged: EventEmitter<
  CalendarEventTimesChangedEvent
> = new EventEmitter<CalendarEventTimesChangedEvent>();

/**
 * @hidden
 */
columnHeaders: WeekDay[];

/**
 * @hidden
 */
view: MonthView;

/**
 * @hidden
 */
openRowIndex: number;

/**
 * @hidden
 */
openDay: MonthViewDay;

/**
 * @hidden
 */
refreshSubscription: Subscription;

/**
 * @hidden
 */
constructor(
  private cdr: ChangeDetectorRef,
  private utils: CalendarUtils,
  @Inject(LOCALE_ID) locale: string
) {
  this.locale = locale;
}

/**
 * @hidden
 */
ngOnInit(): void {
  if (this.refresh) {
    this.refreshSubscription = this.refresh.subscribe(() => {
      this.refreshAll();
      this.cdr.markForCheck();
    });
  }
}

/**
 * @hidden
 */
ngOnChanges(changes: any): void {
  if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
    this.refreshHeader();
  }

  if (changes.events) {
    validateEvents(this.events);
  }

  if (
    changes.viewDate ||
    changes.events ||
    changes.excludeDays ||
    changes.weekendDays
  ) {
    this.refreshBody();
  }

  if (
    changes.activeDayIsOpen ||
    changes.viewDate ||
    changes.events ||
    changes.excludeDays
  ) {
    this.checkActiveDayIsOpen();
  }
}

/**
 * @hidden
 */
ngOnDestroy(): void {
  if (this.refreshSubscription) {
    this.refreshSubscription.unsubscribe();
  }
}

/**
 * @hidden
 */
toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
  this.view.days.forEach(day => {
    if (isHighlighted && day.events.indexOf(event) > -1) {
      day.backgroundColor = event.color.secondary;
    } else {
      delete day.backgroundColor;
    }
  });
}

/**
 * @hidden
 */
eventDropped(day: MonthViewDay, event: CalendarEvent): void {
  const year: number = getYear(day.date);
  const month: number = getMonth(day.date);
  const date: number = getDate(day.date);
  const newStart: Date = setDate(
    setMonth(setYear(event.start, year), month),
    date
  );
  let newEnd: Date;
  if (event.end) {
    const secondsDiff: number = differenceInSeconds(newStart, event.start);
    newEnd = addSeconds(event.end, secondsDiff);
  }
  this.eventTimesChanged.emit({ event, newStart, newEnd });
}

/**
 * @hidden
 */
handleDayClick(clickEvent: any, day: MonthViewDay) {
  // when using hammerjs, stopPropagation doesn't work. See https://github.com/mattlewis92/angular-calendar/issues/318
  if (!clickEvent.target.classList.contains('cal-event')) {
    this.dayClicked.emit({ day });
  }
}

private refreshHeader(): void {
  this.columnHeaders = this.utils.getWeekViewHeader({
    viewDate: this.viewDate,
    weekStartsOn: this.weekStartsOn,
    excluded: this.excludeDays,
    weekendDays: this.weekendDays
  });
  this.emitBeforeViewRender();
}

private refreshBody(): void {
  this.view = this.utils.getMonthView({
    events: this.events,
    viewDate: this.viewDate,
    weekStartsOn: this.weekStartsOn,
    excluded: this.excludeDays,
    weekendDays: this.weekendDays
  });
  this.emitBeforeViewRender();
}

private checkActiveDayIsOpen(): void {
  if (this.activeDayIsOpen === true) {
    this.openDay = this.view.days.find(day =>
      isSameDay(day.date, this.viewDate)
    );
    const index: number = this.view.days.indexOf(this.openDay);
    this.openRowIndex =
      Math.floor(index / this.view.totalDaysVisibleInWeek) *
      this.view.totalDaysVisibleInWeek;
  } else {
    this.openRowIndex = null;
    this.openDay = null;
  }
}

private refreshAll(): void {
  this.columnHeaders = null;
  this.view = null;
  this.refreshHeader();
  this.refreshBody();
  this.checkActiveDayIsOpen();
}

private emitBeforeViewRender(): void {
  if (this.columnHeaders && this.view) {
    this.beforeViewRender.emit({
      header: this.columnHeaders,
      body: this.view.days
    });
  }
}
}
