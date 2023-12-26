import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mobile-hotel-information',
  templateUrl: './mobile-hotel-information.component.html',
  styleUrls: ['./mobile-hotel-information.component.scss']
})
export class MobileHotelInformationComponent implements OnInit {

  @Input() amenities: any
  @Input() hotel: any
  amenitiesArray: any[] = [];
  hotelArray: any[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.amenitiesArray = [this.amenities]
    this.hotelArray = [this.hotel]
    console.log("amenities", this.amenities);
    console.log("hotel", this.hotel);

  }

  toggleContentSingle(selected: any) {
    selected.showMore = !selected.showMore;
  }

  toggleVisibility(amenities: any) {
    amenities.isVisible = !amenities.isVisible;
  }


}
