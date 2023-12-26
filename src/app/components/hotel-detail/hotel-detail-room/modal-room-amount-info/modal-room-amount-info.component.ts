import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotelRoomsService } from 'src/app/services/hotelRooms.service';

@Component({
  selector: 'app-modal-room-amount-info',
  templateUrl: './modal-room-amount-info.component.html',
  styleUrls: ['./modal-room-amount-info.component.scss'],
  encapsulation: ViewEncapsulation.Emulated 
})
export class ModalRoomAmountInfoComponent implements OnInit {

  @Input() room: any | undefined;



  ngOnInit(): void {

    console.log("room", this.room);

  }

  constructor(public activeModal: NgbActiveModal) {}


}
