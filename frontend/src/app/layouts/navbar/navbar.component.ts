import { Component, OnInit } from '@angular/core';
import { RoleGuard } from 'src/app/guards/role.guard';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  decodeToken: any;

  constructor(
    private roleGuard: RoleGuard,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isAdmin();
  }

  isAdmin() {
    return this.roleGuard.isAdmin()
  }

  isAuth(): boolean {
    return this.userService.isAuth();
  }

  isHomeRoute() {
    return this.router.url === '/';
  }

}
