import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

// Providers
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private jwtHerlper: JwtHelperService
    ) { }

  login(user:any) {
    return this.http.post(`${this.URL}/api/login`, user);
  }

  register(user:any) {
    return this.http.post(`${this.URL}/api/register`, user);
  }

  isAuth(): boolean {    
    const token = localStorage.getItem('token');
    if(this.jwtHerlper.isTokenExpired(token!) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const tokenDecoded: any = decode(token!);
      return tokenDecoded;
    }
  }
}
