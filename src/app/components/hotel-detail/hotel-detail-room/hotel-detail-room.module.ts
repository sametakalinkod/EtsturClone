import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailRoomComponent } from './hotel-detail-room.component';
import { RouterModule } from '@angular/router';
import { RoomModalComponent } from './room-modal/room-modal.component';
import { ModalRoomAmountInfoComponent } from './modal-room-amount-info/modal-room-amount-info.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MobileRoomsComponent } from './mobile-rooms/mobile-rooms.component';



@NgModule({
  declarations: [
    HotelDetailRoomComponent,
    RoomModalComponent,
    ModalRoomAmountInfoComponent,
    MobileRoomsComponent],
  exports: [HotelDetailRoomComponent],
  imports: [
    CommonModule,
    NgbCarouselModule,
    CarouselModule.forRoot(),
    RouterModule.forChild([{ path: "", component: HotelDetailRoomComponent }])

  ]
})
export class HotelDetailRoomModule { }
