import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarCommonModule } from '../common/calendar-common.module';

import { WeekDayViewComponent } from './week-day-view/week-day-view.component';
import { WeekDayViewHeaderComponent } from './week-day-view-header/week-day-view-header.component';
import { WeekDayViewEventComponent } from './week-day-view-event/week-day-view-event.component';
import { WeekDayViewHourSegmentComponent } from './week-day-view-hour-segment/week-day-view-hour-segment.component';


export { WeekDayViewComponent } from './week-day-view/week-day-view.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarCommonModule
  ],
  declarations: [WeekDayViewComponent, WeekDayViewHeaderComponent, WeekDayViewEventComponent, WeekDayViewHourSegmentComponent],
  exports: [WeekDayViewComponent],
})
export class WeekDayModule { }
