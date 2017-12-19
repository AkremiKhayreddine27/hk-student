import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WeekDay, DayViewHour, CalendarEvent } from '../../utils/calendar-utils';
import { CalendarUtils } from '../../common/calendar-utils.provider';
import { WeekDayUtils } from '../../common/week-day-utils.provider';
import { WeekDayView } from '../../utils/week-day-utils';

@Component({
  selector: 'app-calendar-week-day-view',
  templateUrl: './week-day-view.component.html',
  styleUrls: ['./week-day-view.component.scss']
})
export class WeekDayViewComponent implements OnInit, OnChanges {

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   * The schema is available here:
   * https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * The start number of the week
   */
  @Input() weekStartsOn: number;

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
   */
  @Input() weekendDays: number[];

  /**
   * @hidden
   */
  days: WeekDay[];

    /**
   * @hidden
   */
  hours: DayViewHour[] = [];

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The precision to display events.
   * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
   */
  @Input() precision: 'days' | 'minutes' = 'days';

  /**
   * The number of segments in an hour. Must be <= 6
   */
  @Input() hourSegments = 2;

  /**
   * The height in pixels of each hour segment
   */
  @Input() hourSegmentHeight = 30;

  /**
   * The day start hours in 24 hour time. Must be 0-23
   */
  @Input() dayStartHour = 0;

  /**
   * The day start minutes. Must be 0-59
   */
  @Input() dayStartMinute = 0;

  /**
    * The day end hours in 24 hour time. Must be 0-23
    */
  @Input() dayEndHour = 23;

  /**
   * The day end minutes. Must be 0-59
   */
  @Input() dayEndMinute = 59;

  /**
   * The width in pixels of each event on the view
   */
  @Input() eventWidth = 150;


  /**
   * An output that will be called before the view is rendered for the current week.
   * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
   */
  @Output()
  beforeViewRender: EventEmitter<{ header: WeekDay[], body: DayViewHour[] }> = new EventEmitter();

  /**
   * Called when the event title is clicked
   */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  /**
   * @hidden
   */
  view: WeekDayView;

  /**
   * @hidden
   */
  refreshSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef, private utils: CalendarUtils, private weekDayUtils: WeekDayUtils) { }

  ngOnInit() {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshBody();
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
    if (changes.events || changes.viewDate || changes.excludeDays) {
      this.refreshBody();
    }
  }

  private refreshHeader(): void {
    this.days = this.utils.getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      weekendDays: this.weekendDays
    });
    this.hours = this.utils.getDayViewHourGrid({
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      }
    });
    this.beforeViewRender.emit({
      header: this.days,
      body: this.hours
    });
  }

  private refreshBody(): void {
    console.log(this.events);
    this.view = this.weekDayUtils.getWeekDayView({
      events: this.events,
      viewDate: this.viewDate,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute
      },
      eventWidth: this.eventWidth,
      segmentHeight: this.hourSegmentHeight,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true
    });
    console.log(this.view);
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

}
