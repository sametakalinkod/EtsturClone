import { Component, Input, OnInit } from '@angular/core';
import { HotelInfoService } from 'src/app/services/hotelInfo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileHotelInformationComponent } from './mobile-hotel-information/mobile-hotel-information.component';

@Component({
  selector: 'app-hotel-detail-information',
  templateUrl: './hotel-detail-information.component.html',
  styleUrls: ['./hotel-detail-information.component.scss']
})
export class HotelDetailInformationComponent implements OnInit {

  @Input() hotel: any | undefined;

  winterAmenities: boolean = false;
  summerAmenities: boolean = false;
  hotelInfos: any[]=[];
  selectedHotels: any[]=[];
  datas: any[]=[];
  data: any[]=[];


  constructor(private hotelInfoService: HotelInfoService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    console.log("hotel information section", this.hotel);
    this.winterSeason();
    this.getHotelDetailInfo();
    this.selectedHotel();

  }


  winterSeason() {
    this.winterAmenities = true;
    this.summerAmenities = false;
  }

  summerSeason() {
    this.summerAmenities = true;
    this.winterAmenities = false;
  }

  getHotelDetailInfo() {
    this.hotelInfoService.getHotelInfo().subscribe((data) => {
      this.hotelInfos = data;
      this.selectedHotel();
    });
  }


  selectedHotel() {
    this.selectedHotels = this.hotelInfos.filter((datas) => {
      return datas.hotelInfoId === this.hotel.hotelId;
    });

    if (this.selectedHotels.length > 0) {
      console.log("Selected hotels information: ", this.selectedHotels);
    } else {
      console.log("No matching hotels found.");
    }
  }

  toggleContentSingle(selected: any) {
    selected.showMore = !selected.showMore;
  }

  toggleContent(winterSection: any, summerSection: any) {
    if (winterSection) {
      winterSection.showMore = !winterSection.showMore;
    }
    if (summerSection) {
      summerSection.showMore = !summerSection.showMore;
    }
  }
  mobileHotelInformationModal(amenities: any,hotel:any) {
    const modalRef = this.modalService.open(MobileHotelInformationComponent);
    modalRef.componentInstance.amenities = amenities;
    modalRef.componentInstance.hotel = hotel;
  }
  
}
