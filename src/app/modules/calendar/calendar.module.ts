import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableHelper } from 'angular-draggable-droppable';

import {
  CalendarCommonModule,
  CalendarModuleConfig,
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  CalendarUtils,
  WeekDayUtils
} from './common/calendar-common.module';

import { DayModule } from './day/day.module';
import { WeekModule } from './week/week.module';
import { MonthModule } from './month/month.module';
import { WeekDayModule } from './week-day/week-day.module';

export * from './common/calendar-common.module';
export * from './day/day.module';
export * from './week/week.module';
export * from './month/month.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarCommonModule,
    DayModule,
    WeekModule,
    MonthModule,
    WeekDayModule
  ],
  declarations: [],
  exports: [
    CalendarCommonModule,
    DayModule,
    WeekModule,
    MonthModule,
    WeekDayModule
  ]
})
export class CalendarModule {
  static forRoot(config: CalendarModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: CalendarModule,
      providers: [
        DraggableHelper,
        config.eventTitleFormatter || CalendarEventTitleFormatter,
        config.dateFormatter || CalendarDateFormatter,
        config.utils || CalendarUtils,
        config.weekDayUtils || WeekDayUtils
      ]
    };
  }
 }
