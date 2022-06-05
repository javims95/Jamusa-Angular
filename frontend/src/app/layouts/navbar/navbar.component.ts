import { Component, OnInit } from '@angular/core';
import { RoleGuard } from 'src/app/guards/role.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  decodeToken: any;

  constructor(
    private roleGuard: RoleGuard
  ) { }

  ngOnInit(): void {
    this.isAdmin();
  }

  isAdmin() {
    if (localStorage.getItem('token')) {
      const role_id = this.roleGuard.decodeToken()['role_id'];
      if (role_id !== 'admin') {
        return false;
      }
      return true;

    } else {

      return false;
    }
  }

}
