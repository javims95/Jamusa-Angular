import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import { UserService } from 'src/app/services/user.service';

// Custom validator for password
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrSvc: ToastrCustomService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      Validator: MustMatch('password', 'confirm_password')
    }
    )
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const user = this.registerForm.value;
    this.userService.register(user).subscribe((res: any) => {
      if(res.status !== 'error') {
        this.toastrSvc.toastr('success', 'Su cuenta ha sido creada')
        this.router.navigate(['login']);
      } else {
        this.toastrSvc.toastr('error', res.error)
      }
    });
  }

  get f() { return this.registerForm.controls; }

}
