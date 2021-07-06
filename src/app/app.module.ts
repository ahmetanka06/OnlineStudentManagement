
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import bootstrap from 'bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AlertifyService } from './services/alertify.service';
import { RegisterComponent } from './register/register.component';
import {
  ScheduleModule, RecurrenceEditorModule, DayService,
  WeekService, WorkWeekService, MonthService, MonthAgendaService
} from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { MyCoursesComponent } from './teacher/my-courses/my-courses.component';
import { StudentinfoComponent } from './student/studentinfo/studentinfo.component';
import { TeacherinfoComponent } from './teacher/teacherinfo/teacherinfo.component';
import { AllcoursesComponent } from './admin/allcourses/allcourses.component';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { StudentcourseComponent } from './student/studentcourse/studentcourse.component';
import { AddcourseComponent } from './teacher/addcourse/addcourse.component';
import { CalendarteacherComponent } from './calendarteacher/calendarteacher.component';
import { DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavComponent,
    CoursesComponent,
    HomeComponent,
    RegisterComponent,
    CalendarComponent,
    AdminComponent,
    StudentComponent,
    TeacherComponent,
    MyCoursesComponent,
    StudentinfoComponent,
    TeacherinfoComponent,
    AllcoursesComponent,
    AllusersComponent,
    StudentcourseComponent,
    AddcourseComponent,
    CalendarteacherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    DateTimePickerModule, DatePickerModule,
    ScheduleModule, RecurrenceEditorModule,

  ],
  providers: [AlertifyService, DatePipe, DayService,
    WeekService, WorkWeekService, MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
