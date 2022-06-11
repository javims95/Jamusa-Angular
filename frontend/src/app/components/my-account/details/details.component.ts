import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyAccountService } from 'src/app/services/my-account.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  updateDataForm: FormGroup;
  submitted = false;

  name = '';
  surname = '';
  username = '';
  email = '';

  constructor(
    private myAccountService: MyAccountService,
    private formBuilder: FormBuilder,
    private notificationsSvc: NotificationsService
  ) { }

  ngOnInit(): void {
    this.myAccountService.getUserDetails().subscribe(data => {
      // Asignacion de los datos obtenidos de la BBDD
      this.name = data[0]['name']
      this.surname = data[0]['surname']
      this.username = data[0]['username']
      this.email = data[0]['email']

      // Rellena el formulario en la vista
      this.updateDataForm.get('name').setValue(this.name);
      this.updateDataForm.get('surname').setValue(this.surname);
      this.updateDataForm.get('username').setValue(this.username);
      this.updateDataForm.get('email').setValue(this.email);
    })

    this.updateDataForm = this.formBuilder.group({
      name: '',
      surname: '',
      username: '',
      email: ''
    });

  }

  updateData() {
    const dataForm = this.updateDataForm.value;
    this.myAccountService.updateUserDetails(dataForm).subscribe((res: any) => {

      if (res.status == 'error') {
        this.notificationsSvc.toastr(res.status, res.error, 'Error')
      } else if (res.status == 'warning') {
        this.notificationsSvc.toastr(res.status, res.error)
      } else if (res.status == 'ok') {
        this.notificationsSvc.toastr('success', 'Datos actualizados correctamente')
      }
    })
  }

  get f() { return this.updateDataForm.controls; }

}
