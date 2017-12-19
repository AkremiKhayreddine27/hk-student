import { Injectable } from '@angular/core';
import { getWeekDayView, WeekDayView } from './../utils/week-day-utils';

@Injectable()
export class WeekDayUtils {

    getWeekDayView(args): WeekDayView {
        return getWeekDayView(args);
    }

}
