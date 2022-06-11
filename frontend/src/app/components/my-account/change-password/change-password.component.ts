import { Component, OnInit } from '@angular/core';
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
    private notificationsSvc: NotificationsService
  ) { }

  ngOnInit() {
  }

  changePassword() {

    if (this.password !== this.confirm_password) {
      this.notificationsSvc.toastr('error', 'Las contraseñas no coinciden', 'Error')
    } else if (this.password == '' || this.confirm_password == '') {
      this.notificationsSvc.toastr('error', 'La contraseña no puede estar vacía', 'Error')
    } else if (this.password.length < 6 || this.confirm_password.length < 6) {
      this.notificationsSvc.toastr('error', 'Debe tener como mínimo 6 caracteres', 'Error')

    }

  }

}
