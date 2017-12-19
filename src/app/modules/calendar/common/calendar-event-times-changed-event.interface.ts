import { CalendarEvent } from '../utils/calendar-utils';

/**
 * The output `$event` type when an event is resized or dragged and dropped.
 */
export interface CalendarEventTimesChangedEvent {
  event: CalendarEvent;
  newStart: Date;
  newEnd?: Date;
}
