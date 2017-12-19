import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Moment } from 'moment';
import * as moment from 'moment';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule } from './modules/calendar/calendar.module';


import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSidenavModule } from '@angular/material';

import { GradesService } from './services/grades.service';
import { StudentService } from './services/student.service';
import { EventService } from './services/event.service';
import { DayService } from './services/day.service';
import { MonthService } from './services/month.service';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { UtilitiesService } from './services/utilities.service';

import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { EventsComponent } from './components/events/events.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GradesComponent } from './components/grades/grades.component';
import { GradeComponent } from './components/grade/grade.component';
import { ShowGradeComponent } from './components/show-grade/show-grade.component';
import { StudentComponent } from './components/student/student.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddCalendarEventComponent } from './components/calendar/add-event/add-event.component';
import { ShowEventComponent } from './components/show-event/show-event.component';
import { ShowStudentComponent } from './components/show-student/show-student.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarHeaderComponent } from './components/calendar/calendar-header/calendar-header.component';
import { ConfirmeDeleteDialogComponent } from './components/confirme-delete-dialog/confirme-delete-dialog.component';
import { ConfirmeDeleteGradeComponent } from './components/confirme-delete-grade/confirme-delete-grade.component';
import { CalendarShowEventDialogComponent } from './components/calendar/calendar-show-event-dialog/calendar-show-event-dialog.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditGradeComponent } from './components/edit-grade/edit-grade.component';

const appRoutes: Routes = [
  {path: '', component: EventsComponent, pathMatch: 'full'},
  {path: 'events/create', component: AddEventComponent},
  {path: 'events/:id', component: ShowEventComponent, pathMatch: 'full'},
  {path: 'calendar/events/create', component: AddCalendarEventComponent},
  {path: 'grades', component: GradesComponent, pathMatch: 'full'},
  {path: 'grades/create', component: AddGradeComponent},
  {path: 'grades/:id', component: ShowGradeComponent, pathMatch: 'full'},
  {path: 'grades/:id/students/create', component: AddStudentComponent},
  {path: 'grades/:id/edit', component: EditGradeComponent},
  {path: 'students/:id', component: ShowStudentComponent, pathMatch: 'full'},
  {path: 'students/:id/edit', component: EditStudentComponent},
  {path: 'calendar', component: CalendarComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventsComponent,
    NavbarComponent,
    SidebarComponent,
    GradesComponent,
    GradeComponent,
    ShowGradeComponent,
    StudentComponent,
    AddGradeComponent,
    AddStudentComponent,
    AddEventComponent,
    AddCalendarEventComponent,
    ShowEventComponent,
    ShowStudentComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    ConfirmeDeleteDialogComponent,
    ConfirmeDeleteGradeComponent,
    CalendarShowEventDialogComponent,
    EditStudentComponent,
    EditGradeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    CalendarModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [
    GradesService,
    StudentService,
    EventService,
    DayService,
    MonthService,
    UserService,
    SessionService,
    UtilitiesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmeDeleteDialogComponent, ConfirmeDeleteGradeComponent, CalendarShowEventDialogComponent]
})
export class AppModule { }
