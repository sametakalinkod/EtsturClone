import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotelRoomsService } from 'src/app/services/hotelRooms.service';
import { RoomModalComponent } from './room-modal/room-modal.component';
import { HotelsService } from 'src/app/services/hotels.service';
import { ModalRoomAmountInfoComponent } from './modal-room-amount-info/modal-room-amount-info.component';
import { DataService } from 'src/app/services/search.service';
import { MobileRoomsComponent } from './mobile-rooms/mobile-rooms.component';

@Component({
  selector: 'app-hotel-detail-room',
  templateUrl: './hotel-detail-room.component.html',
  styleUrls: ['./hotel-detail-room.component.scss']
})
export class HotelDetailRoomComponent implements OnInit {


  @Input() hotelId: string = "";
  @Input() searchData: any;
  searchText: string = '';
  fromDate: Date = new Date();
  toDate: Date = new Date();
  counter: number = 0;
  counterChild: number = 0;
  searchSectionComponent: any;
  nightCount: number = 0;
  totalDiscountAmount: any;
  isVisible:boolean=false;
  rooms: any;
  hotel: any


  ngOnInit(): void {
    this.getRoomDetail();
    this.getHotelDetails();


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
    

  }

  constructor(
    private roomService: HotelRoomsService,
    private modalService: NgbModal,
    private hotelsService: HotelsService,
    private dataService: DataService) { }

  getRoomDetail() {
    this.roomService.getRoomDetails().subscribe((data: any) => {
      this.rooms = data.filter((room: any) => room.hotelid === this.hotelId);
    });
  }

  roomInfoModal(selectedRoom: any) {
    const modalRef = this.modalService.open(RoomModalComponent);
    modalRef.componentInstance.room = selectedRoom;
  }
  modalAmountTable(selectedRoom: any) {
    const modalRef = this.modalService.open(ModalRoomAmountInfoComponent);
    modalRef.componentInstance.room = selectedRoom;
  }
  openMobileRoomsModal(selectedRoom: any, hotelId: any) {
    const modalRef = this.modalService.open(MobileRoomsComponent);
    modalRef.componentInstance.room = selectedRoom;
    modalRef.componentInstance.hotelId = hotelId;
  }
  
  getHotelDetails() {
    this.hotelsService.getHotelById(this.hotelId).subscribe((res: any) => {
      this.hotel = res;
      console.log("HOTEL", this.hotel);

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
}
