import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private toastrSvc: ToastrCustomService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('token');
    this.toastrSvc.toastr('info', 'Has cerrado sesión correctamente')
    this.router.navigate(['/home']);
  }

}
