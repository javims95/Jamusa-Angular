import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  name = '';
  surname = '';
  username = '';
  email = '';

  constructor(
    private detailsService: DetailsService
  ) { }

  ngOnInit(): void {
    this.detailsService.getUserDetails().subscribe(data => {
      this.name = data[0]['name']
      this.surname = data[0]['surname']
      this.username = data[0]['username']
      this.email = data[0]['email']

    })

  }

}
