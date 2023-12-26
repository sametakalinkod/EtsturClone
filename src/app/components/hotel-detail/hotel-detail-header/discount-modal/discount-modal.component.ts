import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.scss']
})
export class DiscountModalComponent implements OnInit{

  openClose:boolean=false;
  constructor(public activeModal: NgbActiveModal) {}

  @Input() hotel: any | undefined;

  ngOnInit(){
  }
  openCloseBtn(){
    this.openClose=!this.openClose;
  }
}
