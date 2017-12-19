import { Component, Input, TemplateRef } from '@angular/core';
import { WeekDay } from '../../utils/calendar-utils';

@Component({
  selector: 'app-month-view-header',
  templateUrl: './month-view-header.component.html',
  styleUrls: ['./month-view-header.component.scss']
})
export class MonthViewHeaderComponent {
  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;
}
