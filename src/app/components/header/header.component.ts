import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderModalComponent } from './header-modal/header-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(    private modalService: NgbModal) {}

  ngOnInit(): void {
  
  }
  openHamburgerMennu() {
    const modalRef = this.modalService.open(HeaderModalComponent);
  }
}
