import { StudentCourse } from './../../models/studentcourse';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Course } from 'src/app/models/course';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;
  courses: any;
  student: any;
  studentDetail: any[] = [];
  courseID: any;
  courseDetail: any;
  isContent: Number = 0;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';
  isClick: Number = 0;
  constructor(private router: Router, private httpClient: HttpClient, private fb: FormBuilder, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if (this.decodedToken === null || this.decodedToken.role !== '0') {
      this.router.navigateByUrl('home');
    } else {

      this.getCourses().subscribe(data => {
        this.courses = data;
      });
    }

  }
  getCourses() {
    return this.httpClient.get<Course[]>(this.path + 'api/courses');
  }

  onClick(courseId: Number) {
    this.isContent = 0;
    this.courseID = courseId;
    this.isClick = 1;
    this.getStudents(courseId);
  }
  getStudents(courseId: Number) {
    this.studentDetail = [];
    this.httpClient.get<StudentCourse[]>
      (this.path + 'api/courses/studentdetail/?id=' + courseId.toString())// derse katılan öğrencileri çağırıyor.
      .subscribe(data => {
        this.student = data;
        for (let index = 0; index < data.length; index++) {
          const element = data[index].studentID;
          this.httpClient.get<Student[]>(this.path + '/api/students/detail/?id=' + element)// öğrencile bilgilerini çağırıyor.
            .subscribe(data2 => {
              this.studentDetail.push(data2);
            });

        }
      });

  }
  getCourseDetail(courseID: any) {
    this.httpClient.get<Course[]>(this.path + 'api/courses/detail/?id=' + courseID) // seçilen kursun içeriklerini çağırıyor.
      .subscribe(data2 => {
        this.courseDetail = data2;
      });

  }
  showContent(courseID: any) {
    this.isClick = 0;
    this.getCourseDetail(courseID);
    this.isContent = 1;
  }
  close() {
    this.isClick = 0;

  }
  closeContent() {
    this.isContent = 0;
  }
}
