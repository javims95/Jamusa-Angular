import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  username = this.userSvc.decodeToken()['username']

  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {
    
  }

}
