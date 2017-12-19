import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DayViewHourSegment, WeekDay, DayViewHour } from './../../utils/calendar-utils';

@Component({
  selector: 'app-week-day-view-hour-segment',
  templateUrl: './week-day-view-hour-segment.component.html',
  styleUrls: ['./week-day-view-hour-segment.component.scss']
})
export class WeekDayViewHourSegmentComponent {


  @Input() hour: DayViewHour;

  @Input() days: WeekDay[];

  @Input() segment: DayViewHourSegment;

  @Input() segmentHeight: number;

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output()
  segmentClicked: EventEmitter<{ day: WeekDay, hour: DayViewHour }> = new EventEmitter<{
    day: WeekDay;
    hour: DayViewHour;
  }>();


}
