import { Component, OnInit } from '@angular/core';
import { MyAccountService } from 'src/app/services/my-account.service';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password = '';
  confirm_password = '';

  constructor(
    private notificationsSvc: NotificationsService,
    private myAccountSvc: MyAccountService
  ) { }

  ngOnInit() {
  }

  changePassword(password, confirm_password) {
    this.myAccountSvc.changePassword(password, confirm_password)
    this.password = ''
    this.confirm_password = ''
  }

}
