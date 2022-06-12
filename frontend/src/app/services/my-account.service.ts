import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from '../guards/role.guard';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private roleGuard: RoleGuard,
    private notificationsSvc: NotificationsService
  ) { }

  // Details
  getUserDetails() {
    const id = this.roleGuard.decodeToken()['id']
    return this.http.get(`${this.URL}/api/get-user-details/${id}`)
  }

  updateUserDetails(dataForm) {
    const id = this.roleGuard.decodeToken()['id']
    dataForm['id'] = id

    return this.http.post(`${this.URL}/api/update-user-details`, dataForm)
  }

  // Change password
  changePassword(password, confirm_password) {

    const token = localStorage.getItem('token')

    const dataChangePassword = {
      token: token,
      password: password
    }
    const petition = this.http.post(`${this.URL}/api/change-password`, dataChangePassword)

    if (password !== confirm_password) {
      this.notificationsSvc.toastr('error', 'Las contraseñas no coinciden', 'Error')

    } else if (password == '' || confirm_password == '') {
      this.notificationsSvc.toastr('error', 'La contraseña no puede estar vacía', 'Error')

    } else if (password.length < 6 || confirm_password.length < 6) {
      this.notificationsSvc.toastr('error', 'Debe tener como mínimo 6 caracteres', 'Error')

    } else {
      petition.subscribe((res: any) => {
        if (res.status == 'error') {
          this.notificationsSvc.toastr('error', res.error, 'Error')
        } else {
          this.notificationsSvc.toastr('success', 'Contraseña actualizada correctamente')
        }
      })
    }
  }

}
