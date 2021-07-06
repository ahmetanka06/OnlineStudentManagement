import { AppComponent } from './app.component';
import { AddcourseComponent } from './teacher/addcourse/addcourse.component';
import { StudentcourseComponent } from './student/studentcourse/studentcourse.component';
import { AllusersComponent } from './admin/allusers/allusers.component';
import { AllcoursesComponent } from './admin/allcourses/allcourses.component';
import { TeacherinfoComponent } from './teacher/teacherinfo/teacherinfo.component';
import { StudentinfoComponent } from './student/studentinfo/studentinfo.component';
import { MyCoursesComponent } from './teacher/my-courses/my-courses.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

export const appRoutes: Routes = [

  { path: 'courses', component: CoursesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'my-courses', component: MyCoursesComponent },
  { path: 'studentcourse', component: StudentcourseComponent },
  { path: 'studentinfo', component: StudentinfoComponent },
  { path: 'teacherinfo', component: TeacherinfoComponent },
  { path: 'allcourses', component: AllcoursesComponent },
  { path: 'allusers', component: AllusersComponent },
  { path: 'addcourse', component: AddcourseComponent },
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'courses', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'register', redirectTo: 'register', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'student', redirectTo: 'student', pathMatch: 'full' },
  { path: 'teacher', redirectTo: 'teacher', pathMatch: 'full' },
  { path: 'my-courses', redirectTo: 'my-courses', pathMatch: 'full' },
  { path: 'studentcourse', redirectTo: 'studentcourse', pathMatch: 'full' },
  { path: 'studentinfo', redirectTo: 'studentinfo', pathMatch: 'full' },
  { path: 'teacherinfo', redirectTo: 'teacherinfo', pathMatch: 'full' },
  { path: 'allcourses', redirectTo: 'allcourses', pathMatch: 'full' },
  { path: 'allusers', redirectTo: 'allusers', pathMatch: 'full' },
  { path: 'addcourse', redirectTo: 'addcourse', pathMatch: 'full' },

  { path: '*', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
