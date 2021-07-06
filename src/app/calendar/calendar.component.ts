import { Course } from 'src/app/models/course';
import { HttpClient } from '@angular/common/http';
import { Calendar } from './../models/calendar';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, View, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { DataManager } from '@syncfusion/ej2-data';
import { formatDate } from '@angular/common';
import { bufferToggle } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  // tslint:disable-next-line:max-line-length
  template: `<ejs-schedule width="100%" height="550px" [readonly]="true"
  [currentView]="setView" dateFormat="yyyy/MM/dd" [selectedDate]="selectedDate"
  [eventSettings]="eventSettings"></ejs-schedule>`,
  // templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  public selectedDate: Date = new Date();
  data: Calendar[] = [];
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  courses: Course[] = [];
  public setView: View = 'Week';
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };



  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.getCourses();

  }
  getCourses() {

    this.http.get<Course[]>(this.path + 'api/courses').subscribe(data => {
      this.courses = data;
      this.setView = 'Month';

      for (let index = 0; index < data.length; index++) {
        // tslint:disable-next-line:no-shadowed-variable
        const element = this.courses[index];

        const dataa = {
          Subject: element.courseName,
          StartTime: new Date(element.courseStart),
          EndTime: new Date(element.courseEnd),
          Id: element.courseID.toString(),
          Description: element.courseDetail,
          CategoryColor: '#1aaa55'
        };
        this.data.push(dataa);
        console.log(dataa);
      }

    });
  }

}




