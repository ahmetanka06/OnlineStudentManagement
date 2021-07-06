import { StudentCourse } from 'src/app/models/studentcourse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Course } from '../models/course';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  isClick: Number = 0;
  registerStudent: any;
  studentID: any;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  courseID: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;
  role: any;
  constructor(private httpClient: HttpClient, private alertifyService: AlertifyService) {

  }
  ngOnInit() {
    this.getCourses().subscribe(data => {
      this.courses = data;
    });
    this.registerStudent = new StudentCourse;
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if (this.decodedToken === null) {
      this.role = 'null';
    } else {
      this.role = this.decodedToken.role;
      this.studentID = this.decodedToken.nameid;
    }

    if (this.role === '2') {
      this.isClick = 1;
    } else {
      this.isClick = 0;
    }


  }
  getCourses() {
    return this.httpClient.get<Course[]>(this.path + 'api/courses');
  }
  onClick(courseID) {
    this.registerStudent.courseID = courseID;
    this.registerStudent.studentID = Number(this.studentID);
    console.log(this.registerStudent);
    this.addCourses();
  }
  addCourses() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'api/courses/studentregistration', this.registerStudent, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success('Kayıt Yapıldı');
      }, (err: HttpErrorResponse) => {
        this.alertifyService.error('Daha önce kayıt olunmuş.');
      });
  }
}
