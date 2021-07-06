import { Teacher } from './../../models/teacher';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentCourse } from 'src/app/models/studentcourse';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  teacher: any;
  courses: any;
  id: any;
  form: FormGroup;
  courseID: any;
  isClick: Number = 0;
  isBool: Number = 0;
  teacherID: any;
  decodedToken: any;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  name: any;
  start: any;
  end: any;
  fees: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  student: any;
  studentDetail: any[] = [];
  constructor(private router: Router, private httpClient: HttpClient, private fb: FormBuilder, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if (this.decodedToken === null || this.decodedToken.role !== '1') {
      this.router.navigateByUrl('home');
    } else {
      this.teacher = new Teacher;
      this.courses = new Course;
      this.teacherID = this.decodedToken.nameid;
      this.getCourseID().subscribe(data => {
        this.courses = data;


        console.log(this.courses);
      });
    }
  }
  getCourseID() {
    return this.httpClient.get<Course[]>(this.path + 'api/courses/detail/?id=' + this.teacherID);
  }
  getStudents() {
    this.studentDetail = [];
    this.httpClient.get<StudentCourse[]>
      (this.path + 'api/courses/studentdetail/?id=' + this.teacherID.toString())// derse katılan öğrencileri çağırıyor.
      .subscribe(data => {
        this.student = data;
        for (let index = 0; index < data.length; index++) {
          const element = data[index].studentID;
          this.httpClient.get<Student[]>(this.path + 'api/students/detail/?id=' + element)// öğrencile bilgilerini çağırıyor.
            .subscribe(data2 => {
              this.studentDetail.push(data2);
            });

        }
      });
  }
  onClick() {
    this.createForm();
    if (this.isClick === 0) {
      this.isClick = 1;
      this.isBool = 0;

    } else {
      this.isClick = 0;
    }

  }
  onClickStudent() {
    if (this.isBool === 0) {
      this.isBool = 1;
      this.isClick = 0;
      this.getStudents();

    } else {
      this.isBool = 0;
    }
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      fees: ['', Validators.required],
      detail: ['', Validators.required],
      content: ['', Validators.required],
      courseStart: ['', Validators.required],
      courseEnd: ['', Validators.required],
    });
  }
  submit() {

    this.name = this.form.get('name').value;
    if ((this.form.invalid)) {

      alert('Lütfen tüm alanları doldurun');
    } else {
      this.SaveCourse();
    }
  }
  cancel() {
    this.isClick = 0;
  }
  close() {
    this.isBool = 0;
  }
  SaveCourse() {
    this.courses.fees = Number(this.courses.fees);
    this.courses.duration = Number(this.courses.duration);

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'api/courses/update', this.courses, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success('Kayıt Yapıldı');
        setInterval(function () {
          window.location.reload(false);
        }, 1000);

      }, (err: HttpErrorResponse) => {
        if (err) {
          this.alertifyService.error('hata' + err.status.toString());
        }
      });

  }

}


