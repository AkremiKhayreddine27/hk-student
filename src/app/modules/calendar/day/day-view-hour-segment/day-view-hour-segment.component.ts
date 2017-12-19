import { Component, Input, TemplateRef } from '@angular/core';
import { DayViewHourSegment } from './../../utils/calendar-utils';

@Component({
  selector: 'app-day-view-hour-segment',
  templateUrl: './day-view-hour-segment.component.html',
  styleUrls: ['./day-view-hour-segment.component.scss']
})
export class DayViewHourSegmentComponent {

  @Input() segment: DayViewHourSegment;

  @Input() segmentHeight: number;

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

}
