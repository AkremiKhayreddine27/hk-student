import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';

import { CalendarCommonModule } from '../common/calendar-common.module';
import { DayViewComponent } from './day-view/day-view.component';
import { DayViewHourSegmentComponent } from './day-view-hour-segment/day-view-hour-segment.component';
import { DayViewEventComponent } from './day-view-event/day-view-event.component';
import { DayViewAllDayEventComponent } from './day-view-all-day-event/day-view-all-day-event.component';

export { DayViewComponent } from './day-view/day-view.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule
  ],
  declarations: [
    DayViewComponent,
    DayViewHourSegmentComponent,
    DayViewEventComponent,
    DayViewAllDayEventComponent
  ],
  exports: [
    DayViewComponent,
    DayViewHourSegmentComponent,
    DayViewEventComponent,
    DayViewAllDayEventComponent
  ]
})
export class DayModule { }
