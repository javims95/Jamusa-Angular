import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  name = 'Javi';
  surname = '';
  username = '';
  email = '';

  constructor() { }

  ngOnInit(): void {
  }

}
