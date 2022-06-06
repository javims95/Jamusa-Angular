import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    this.submitted = true;
    
    if(this.loginForm.invalid) {
      return;
    }

    const user = this.loginForm.value;
    this.userService.login(user).subscribe((res:any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['my-account']);
    });
  }

  get f() { return this.loginForm.controls; }

}
