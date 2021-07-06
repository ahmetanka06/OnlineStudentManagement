import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';
  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.path + 'courses');
  }
  getCoursesById(id: Number): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.path + 'courses/detail/?id=' + id);
  }
}
