import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationsSvc: NotificationsService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const user = this.loginForm.value;
    this.userService.login(user).subscribe((res: any) => {
      if (res.token !== undefined) {    
        this.notificationsSvc.toastr('success', 'Te has logueado correctamente');
        localStorage.setItem('token', res.token);
        this.router.navigate(['my-account']);
      } else {
        this.notificationsSvc.toastr('error', res.error)
        localStorage.removeItem('token');
      }

    });

  }

  // Toastr 
  

  get f() { return this.loginForm.controls; }

}
