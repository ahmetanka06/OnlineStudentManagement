import { toDate } from '@angular/common/src/i18n/format_date';
import { Course } from 'src/app/models/course';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Calendar } from './../models/calendar';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, View, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { ActionEventArgs, EJ2Instance, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { DataManager } from '@syncfusion/ej2-data';
import { DatePipe } from '@angular/common';
import { Button, element } from 'protractor';
import { L10n } from '@syncfusion/ej2-base';
import { AlertifyService } from '../services/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'Add Course',
    },
  }
});
@Component({
  selector: 'app-calendarteacher',
  // tslint:disable-next-line:max-line-length
  template: `<ejs-schedule width="100%" [readonly]="isBool" [eventSettings]="eventSettings" [showQuickInfo]="false" height="550px" [views]="views" [minDate]="minDate" (popupOpen) = "onPopupOpen($event) " (actionBegin)="onActionBegin($event)" [currentView]="setView" dateFormat="yyyy/MM/dd" [selectedDate]="selectedDate" [eventSettings]="eventSettings">
     <ng-template #editorTemplate let-data>
            <table  class="custom-event-editor" width="100%" cellpadding="5">
                <tbody>
                    <tr>
                        <td class="e-textlabel">Course Name</td>
                        <td colspan="4">
                            <input id="CourseName" class="e-field e-input" type="text" value="{{data.CourseName}}"
                                name="CourseName" style="width: 100%" />
                        </td>
                    </tr>
                    <tr>
                        <td class="e-textlabel">Fees</td>
                        <td colspan="4">
                        <input id="Fees" class="e-field e-input" type="text" value="{{data.Fees}}"
                                name="Fees" style="width: 100%" />
                        </td>
                    </tr>

                    <tr>
                        <td class="e-textlabel">From</td>
                        <td colspan="4">
                        <ejs-datetimepicker id="CourseStart" class="e-field" data-name="StartTime"
                                format="M/dd/yy h:mm a"  [value]="dateParser(data.startTime || data.StartTime)">
                            </ejs-datetimepicker>
                        </td>
                    </tr>
                    <tr>
                        <td class="e-textlabel">To</td>
                        <td colspan="4">
                        <ejs-datetimepicker id="EndTime" class="e-field" data-name="EndTime" format="M/dd/yy h:mm a"
                                [value]='dateParser(data.endTime || data.EndTime)'></ejs-datetimepicker>
                        </td>
                    </tr>
                    <tr>
                        <td class="e-textlabel">Detail</td>
                        <td colspan="4">
                            <textarea id="CourseDetail" class="e-field e-input" name="CourseDetail" rows="3" cols="50"
                                value="{{data.CourseDetail}}"
                                style="width: 100%; height: 60px !important; resize: vertical"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="e-textlabel">Content</td>
                        <td colspan="4">
                            <textarea id="CourseContent" class="e-field e-input" name="CourseContent" rows="3" cols="50"
                                value="{{data.CourseContent}}"
                                style="width: 100%; height: 60px !important; resize: vertical"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>

</ejs-schedule>`,
  styleUrls: ['./calendarteacher.component.css']
})

export class CalendarteacherComponent implements OnInit {
  public selectedDate: Date = new Date();
  public start: Date = new Date();
  public end: Date = new Date();
  element: any;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  // tslint:disable-next-line:no-inferrable-types
  isBool: boolean = false;
  data: Calendar[] = [];
  public views: Array<string> = ['Day', 'Week', 'Month', 'Agenda'];
  courseName: any;
  decodedToken: any;
  teacherID: any;
  teacherName: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  newCourse: any;
  public setView: View = 'Week';
  // tslint:disable-next-line:no-inferrable-types
  public showQuickInfo: boolean = false;

  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };
  public today = new Date();
  public minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  isValidAction(date) {
    return !(date.getTime() > new Date().getTime());
  }
  public dateParser(data: string) {
    return new Date(data);
  }


  onPopupOpen(args: PopupOpenEventArgs): void {


    const buttonElement = args.type === 'QuickInfo' ? '.e-event-popup .e-edit' : '.e-schedule-dialog .e-event-edit';
    const editButton = document.querySelector(buttonElement);
    if (editButton && (editButton as EJ2Instance).ej2_instances) {
      ((editButton as EJ2Instance).ej2_instances[0]).disabled = true;

    }
    const buttonElement2 = args.type === 'QuickInfo' ? '.e-event-popup .e-delete' : '.e-schedule-dialog .e-event-delete';
    const editButton2 = document.querySelector(buttonElement2);
    if (editButton2 && (editButton2 as EJ2Instance).ej2_instances) {
      ((editButton2 as EJ2Instance).ej2_instances[0]).disabled = true;

    }
  }
  constructor(private datepipe: DatePipe, private router: Router, private http: HttpClient, private alertifyService: AlertifyService) {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.teacherID = this.decodedToken.nameid;
    this.teacherName = localStorage.getItem('userName');
    this.getCourses();


  }
  public onActionBegin(args: { [key: string]: Object }): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: any;
      if (args.requestType === 'eventCreate') {
        data = <any>args.data[0];
        data.courseID = Number(this.teacherID);
        data.Fees = Number(data.Fees);
        data.Duration = Number(data.Duration);
        this.start = data.StartTime;
        this.end = data.EndTime;
        const a = this.start.toISOString();
        const b = this.end.toISOString();
        data.courseStart = a;
        data.courseEnd = b;
        data.TeacherName = this.teacherName;
        this.newCourse = data;
        console.log(this.newCourse);
        this.courseAdd();
      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
      }

    }
  }
  courseAdd() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + 'api/courses/add', this.newCourse, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success('Kayıt Yapıldı');

        this.router.navigateByUrl('my-courses');

      }, (err: HttpErrorResponse) => {
        this.alertifyService.error(err.status.toString() + 'Hata');

      });
  }
  ngOnInit() {
  }
  getCourses() {

    this.http.get<Course[]>(this.path + 'api/courses/detail/?id=' + this.teacherID).subscribe(data => {

      // tslint:disable-next-line:no-shadowed-variable
      const element: any = data;
      const ab = moment(element.courseStart).format('yyyy/MM/DD');

      this.minDate = new Date(ab);
      console.log(element);
      const dataa = {
        Subject: element.courseName,
        StartTime: new Date(element.courseStart),
        EndTime: new Date(element.courseEnd),
        Id: element.courseID.toString(),
        Description: element.courseDetail
      };
      this.isBool = true;
      this.data.push(dataa);

    });
  }

}




