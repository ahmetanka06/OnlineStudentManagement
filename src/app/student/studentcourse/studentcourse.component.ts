import { Observable } from 'rxjs';
import { Course } from './../../models/course';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentCourse } from 'src/app/models/studentcourse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentcourse',
  templateUrl: './studentcourse.component.html',
  styleUrls: ['./studentcourse.component.css']
})
export class StudentcourseComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.role = this.decodedToken.role;
    if (this.decodedToken.role !== '2' || this.decodedToken === null) {
      this.router.navigateByUrl('/home');
    }
  }
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  courseList: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  studentID: any;
  lobbies: Observable<any>;
  total: Number = 0;
  course: any;
  decodedToken: any;
  role: any;
  ngOnInit() {

    this.studentID = this.decodedToken.nameid;
    this.getStudents(this.studentID);
    console.log(this.lobbies);
    this.courseList.push('');
  }
  getStudents(studentID: Number) {
    this.courseList = [];
    this.course = new Course();
    this.httpClient.get<StudentCourse[]>(this.path + 'api/courses/studentcourse/?id=' + studentID.toString())
      .subscribe(data => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index].courseID;
          this.httpClient.get<Course[]>(this.path + 'api/courses/detail/?id=' + element)
            .subscribe(data2 => {

              this.courseList.push(data2);
              this.course = data2;
              this.total += this.course.fees;

            });

        }

      });

  }

}
