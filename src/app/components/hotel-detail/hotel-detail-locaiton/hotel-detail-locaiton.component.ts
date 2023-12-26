import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-detail-locaiton',
  templateUrl: './hotel-detail-locaiton.component.html',
  styleUrls: ['./hotel-detail-locaiton.component.scss']
})
export class HotelDetailLocaitonComponent implements OnInit {

  @Input() hotel: any; 

  ngOnInit(): void {
   
  }
}
