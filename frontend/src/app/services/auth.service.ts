import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Providers
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private jwtHerlper: JwtHelperService
    ) { }

  login(user:any) {
    return this.http.post(`${this.URL}/user/login`, user);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if(this.jwtHerlper.isTokenExpired(token!) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }
}
