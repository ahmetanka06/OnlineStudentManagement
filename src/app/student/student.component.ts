import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../models/course';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  courses: Course[] = [];
  sira_no: number;
  yetki: any;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  isClick: any;
  ngOnInit() {
    if (Number(localStorage.getItem('role')) !== 2 || localStorage.getItem('role') === null) {
      this.router.navigate(['home']);

    } else {


      this.yetki = localStorage.getItem('role');
      if (this.yetki === '0') {
        this.isClick = 1;
      } else {
        this.isClick = 0;
      }
      this.getCourses().subscribe(data => {
        this.courses = data;
      });
    }
  }
  getCourses() {
    return this.http.get<Course[]>(this.path + 'api/courses');
  }
  onClick(course: any) {
    if (localStorage.getItem('role') === '0') {
      this.router.navigate(['course-detail', { item: course }]);

    }
  }



}
