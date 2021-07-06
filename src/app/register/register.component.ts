import { Router } from '@angular/router';
import { registerUser } from './../models/registerUser';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }
  registerForm: FormGroup;
  registerUser: any;
  role: Number = 2;
  ngOnInit() {
    if (localStorage.getItem('role') !== '0') {
      this.router.navigate(['home']);
    }
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      { Validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { misMatch: true };
  }
  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.registerUser.role = Number(this.role);
      // alert(this.registerUser.role);
      this.authService.register(this.registerUser);
    }

  }
  onItemChange(value) {
    this.role = value;
    // alert(this.role);
  }
}
