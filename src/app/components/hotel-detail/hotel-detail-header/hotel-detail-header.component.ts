import { Component, Input, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountModalComponent } from './discount-modal/discount-modal.component';
import { HoneymooModalComponent } from './honeymoo-modal/honeymoo-modal.component';
import { DataService } from 'src/app/services/search.service';
import { HotelRoomsService } from 'src/app/services/hotelRooms.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-hotel-detail-header',
  templateUrl: './hotel-detail-header.component.html',
  styleUrls: ['./hotel-detail-header.component.scss']
})
export class HotelDetailHeaderComponent implements OnInit {

  @Input() searchData: any;
  @Input() hotel: any | undefined;
  mapActive: boolean = false;
  searchText: string = '';
  fromDate: Date = new Date();
  toDate: Date = new Date();
  counter: number = 0;
  counterChild: number = 0;
  searchSectionComponent: any;
  nightCount: number = 0;
  totalDiscountAmount: any;
  room:any
  constructor(
    private modalService: NgbModal,
    private dataService: DataService,
    private roomService: HotelRoomsService,
    private sanitizer: DomSanitizer
  ) { }




  ngOnInit(): void {
    this.dataService.searchData$.subscribe((params: any) => {
      this.searchText = params?.searchText ?? null;
      this.fromDate = params?.fromDate || new Date();
      this.toDate = params?.toDate || new Date();
      this.nightCount = params?.nightCount || 0;
      this.counter = params?.counter || 0;
      this.counterChild = params?.counterChild || 0;
    
      this.searchData = {
        searchText: this.searchText,
        fromDate: this.fromDate,
        toDate: this.toDate,
        nightCount: this.nightCount,
        counter: this.counter,
        counterChild: this.counterChild
      };
    
      console.log("searchText", this.searchText);
      console.log("searchData", this.searchData);
    });
    

    this.getRoomDetail();
  }

  mapView() {
    this.mapActive = !this.mapActive;
  }

  openDiscountModal() {
    const modalRef = this.modalService.open(DiscountModalComponent);
    modalRef.componentInstance.hotel = this.hotel;

  }
  openHoneymoonModal() {
    const modalRef = this.modalService.open(HoneymooModalComponent);
    modalRef.componentInstance.hotel = this.hotel;

  }
  getRoomDetail() {

    this.roomService.getRoomDetails().subscribe((data: any) => {
      this.room = data.filter((room: any) => room.hotelid === this.hotel.hotelId);
     
    });
  }
  calculateTotalAmount(room: any): number {

    const totalAmount = room.amount * this.nightCount;

    return totalAmount;
  }

  calculeDiscountPrices(room: any): number {
    const discountAmount = (room.amount * room.discount) / 100;
    const discountedPrice = room.amount - discountAmount;
    const totalDiscountAmount = discountedPrice * this.nightCount;

    return totalDiscountAmount;
  }
  get sanitizedLocationIFrame(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.hotel?.locationIFrame);
  }
}
