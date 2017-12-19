import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragAndDropModule } from 'angular-draggable-droppable';

import { CalendarCommonModule } from '../common/calendar-common.module';

import { MonthViewComponent } from './month-view/month-view.component';
import { MonthViewHeaderComponent } from './month-view-header/month-view-header.component';
import { MonthCellComponent } from './month-cell/month-cell.component';
import { OpenDayEventsComponent } from './open-day-events/open-day-events.component';

export { MonthViewComponent } from './month-view/month-view.component';
export { MonthViewDay as CalendarMonthViewDay } from '../utils/calendar-utils';

@NgModule({
  imports: [
    CommonModule,
    DragAndDropModule,
    CalendarCommonModule
  ],
  declarations: [
    MonthViewComponent,
    MonthViewHeaderComponent,
    MonthCellComponent,
    OpenDayEventsComponent
  ],
  exports: [
    MonthViewComponent,
    MonthViewHeaderComponent,
    MonthCellComponent,
    OpenDayEventsComponent
  ]
})
export class MonthModule { }
