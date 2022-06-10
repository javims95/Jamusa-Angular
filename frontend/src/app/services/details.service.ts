import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from '../guards/role.guard';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private roleGuard: RoleGuard
  ) { }

  getUserDetails() {
    const id = this.roleGuard.decodeToken()['id']
    return this.http.get(`${this.URL}/api/get-user-details/${id}`)
  }

}
