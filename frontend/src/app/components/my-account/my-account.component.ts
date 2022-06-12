import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(
    private router: Router,
    private notificationsSvc: NotificationsService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['my-account/desktop'])
  }

  logout() {
    localStorage.removeItem('token');
    this.notificationsSvc.toastr('info', 'Has cerrado sesión correctamente')
    this.router.navigate(['/home']);
  }

}
