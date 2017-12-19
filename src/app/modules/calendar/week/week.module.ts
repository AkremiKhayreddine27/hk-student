import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { CalendarCommonModule } from '../common/calendar-common.module';
import { WeekViewComponent } from './week-view/week-view.component';
import { WeekViewHeaderComponent } from './week-view-header/week-view-header.component';
import { WeekViewEventComponent } from './week-view-event/week-view-event.component';


export { WeekViewComponent } from './week-view/week-view.component';
export {
  WeekViewEvent as CalendarWeekViewEvent,
  WeekViewEventRow as CalendarWeekViewEventRow,
  GetWeekViewArgs as CalendarGetWeekViewArgs
} from '../utils/calendar-utils';


@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule,
    CalendarCommonModule
  ],
  declarations: [
    WeekViewComponent,
    WeekViewHeaderComponent,
    WeekViewEventComponent
  ],
  exports: [
    WeekViewComponent,
    WeekViewHeaderComponent,
    WeekViewEventComponent
  ]
})
export class WeekModule { }
