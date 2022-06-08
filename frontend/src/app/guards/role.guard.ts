import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private userService: UserService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (localStorage.getItem('token')) {

      const expectedRole = route.data['expectedRole'];
      const role = this.decodeToken()['role'];      

      if (!this.userService.isAuth() || role !== expectedRole) {
        console.log('Usuario no autorizado para la vista');
        this.router.navigate(['login']);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const tokenDecoded: any = decode(token!);
      return tokenDecoded;
    }
  }

  isAdmin() {
    if (localStorage.getItem('token')) {
      const role_id = this.decodeToken()['role_id'];
      if (role_id !== 'admin') {
        return false;
      }
      return true;

    } else {

      return false;
    }
  }

}
