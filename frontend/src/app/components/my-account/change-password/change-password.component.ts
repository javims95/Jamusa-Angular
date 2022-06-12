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

  token = localStorage.getItem('token')

  dataChangePassword = {
    token: this.token,
    password: this.password
  }

  constructor(
    private notificationsSvc: NotificationsService,
    private myAccountSvc: MyAccountService
  ) { }

  ngOnInit() {
  }

  changePassword() {
    this.dataChangePassword.password = this.password

    if (this.password !== this.confirm_password) {
      this.notificationsSvc.toastr('error', 'Las contraseñas no coinciden', 'Error')
    } else if (this.password == '' || this.confirm_password == '') {
      this.notificationsSvc.toastr('error', 'La contraseña no puede estar vacía', 'Error')
    } else if (this.password.length < 6 || this.confirm_password.length < 6) {
      this.notificationsSvc.toastr('error', 'Debe tener como mínimo 6 caracteres', 'Error')
    } else {
      this.myAccountSvc.changePassword(this.dataChangePassword).subscribe((res: any) => {
        if (res.status == 'error') {
          this.notificationsSvc.toastr('error', res.error, 'Error')
        } else {
          this.notificationsSvc.toastr('success', 'Contraseña actualizada correctamente')
          this.password = ''
          this.confirm_password = ''
        }


      })

    }

  }

}
