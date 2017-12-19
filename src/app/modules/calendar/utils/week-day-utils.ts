import { CalendarEvent, getExcludedSeconds, getWeekViewEventOffset, getWeekViewEventSpan, getEventsInPeriod  } from './calendar-utils';
import addDays from 'date-fns/add_days';
import addHours from 'date-fns/add_hours';
import addMinutes from 'date-fns/add_minutes';
import addSeconds from 'date-fns/add_seconds';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import endOfDay from 'date-fns/end_of_day';
import endOfMonth from 'date-fns/end_of_month';
import endOfWeek from 'date-fns/end_of_week';
import getDay from 'date-fns/get_day';
import isDate from 'date-fns/is_date';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isSameSecond from 'date-fns/is_same_second';
import max from 'date-fns/max';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import startOfDay from 'date-fns/start_of_day';
import startOfMinute from 'date-fns/start_of_minute';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';

const MINUTES_IN_HOUR = 60;

export interface WeekDayView {
    events: WeekDayViewEvent[];
    width: number;
    allDayEvents: CalendarEvent[];
}

export interface WeekDayViewEvent {
    event: CalendarEvent;
    offset: number;
    span: number;
    startsBeforeWeek: boolean;
    endsAfterWeek: boolean;
    height: number;
    width: number;
    top: number;
    left: number;
    startsBeforeDay: boolean;
    endsAfterDay: boolean;
}

export function getWeekDayView({
        events = [],
        viewDate,
        hourSegments,
        dayStart,
        dayEnd,
        eventWidth,
        segmentHeight,
        weekStartsOn,
        excluded,
        precision,
        absolutePositionedEvents
    }): WeekDayView {
          if (!events) {
            events = [];
          }
          const startOfViewWeek: Date = startOfWeek(viewDate, { weekStartsOn });
          const endOfViewWeek: Date = endOfWeek(viewDate, { weekStartsOn });

          const startOfView: Date = setMinutes(
            setHours(startOfDay(viewDate), dayStart.hour),
            dayStart.minute
          );
          const endOfView: Date = setMinutes(
            setHours(startOfMinute(endOfDay(viewDate)), dayEnd.hour),
            dayEnd.minute
          );
          const previousDayEvents: WeekDayViewEvent[] = [];

          const dayViewEvents: WeekDayViewEvent[] = getEventsInPeriod({
            events: events,
            periodStart: startOfViewWeek,
            periodEnd: endOfViewWeek
          })
            .sort((eventA: CalendarEvent, eventB: CalendarEvent) => {
              return eventA.start.valueOf() - eventB.start.valueOf();
            })
            .map((event: CalendarEvent) => {
              const eventStart: Date = event.start;
              const eventEnd: Date = event.end || eventStart;
              const startsBeforeDay: boolean = eventStart < startOfViewWeek;
              const endsAfterDay: boolean = eventEnd > endOfViewWeek;
              const hourHeightModifier: number =
                hourSegments * segmentHeight / MINUTES_IN_HOUR;

              let top = 0;
              console.log(eventStart.getDate());
              top += differenceInMinutes(eventStart, startOfView.setDate(eventStart.getDate()));

              const startDate: Date = startsBeforeDay ? startOfViewWeek : eventStart;
              const endDate: Date = endsAfterDay ? endOfView : eventEnd;
              let height: number = differenceInMinutes(endDate, startDate);
              if (!event.end) {
                height = segmentHeight;
              } else {
                height *= hourHeightModifier;
              }

              const bottom: number = top + height;

              const overlappingPreviousEvents: WeekDayViewEvent[] = previousDayEvents.filter(
                (previousEvent: WeekDayViewEvent) => {
                  const previousEventTop: number = previousEvent.top;
                  const previousEventBottom: number =
                    previousEvent.top + previousEvent.height;

                  if (top < previousEventBottom && previousEventBottom < bottom) {
                    return true;
                  } else if (previousEventTop <= top && bottom <= previousEventBottom) {
                    return true;
                  }

                  return false;
                }
              );

              let left = 0;

              while (overlappingPreviousEvents.some(
                  previousEvent => previousEvent.left === left
                )
              ) {
                left += eventWidth;
              }

              const offset: number = getWeekViewEventOffset({
                event,
                startOfWeek: startOfViewWeek,
                excluded,
                precision
              });
              const span: number = getWeekViewEventSpan({
                event,
                offset,
                startOfWeekDate: startOfViewWeek,
                excluded,
                precision
              });
              const startsBeforeWeek = true;
              const endsAfterWeek = false;
              const dayEvent: WeekDayViewEvent = {
                event,
                offset,
                span,
                startsBeforeWeek,
                endsAfterWeek,
                height,
                width: eventWidth,
                top,
                left,
                startsBeforeDay,
                endsAfterDay
              };
              if (height > 0) {
                previousDayEvents.push(dayEvent);
              }
              console.log('event height' + dayEvent.height);
              return dayEvent;
            })
            ;

          const width: number = Math.max(
            ...dayViewEvents.map((event: WeekDayViewEvent) => event.left + event.width)
          );
          const allDayEvents: CalendarEvent[] = getEventsInPeriod({
            events: events.filter((event: CalendarEvent) => event.allDay),
            periodStart: startOfDay(startOfView),
            periodEnd: endOfDay(endOfView)
          });
          console.log('dayViewEvents' + dayViewEvents);
          return {
            events: dayViewEvents,
            width,
            allDayEvents
          };
}


