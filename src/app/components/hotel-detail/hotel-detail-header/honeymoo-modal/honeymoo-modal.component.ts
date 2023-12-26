import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-honeymoo-modal',
  templateUrl: './honeymoo-modal.component.html',
  styleUrls: ['./honeymoo-modal.component.scss']
})
export class HoneymooModalComponent implements OnInit{

  openClose:boolean=false;
  constructor(public activeModal: NgbActiveModal) {}

  @Input() hotel: any | undefined;

  ngOnInit(){
  }
  openCloseBtn(){
    this.openClose=!this.openClose;
  }
}
