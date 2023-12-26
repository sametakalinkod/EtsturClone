import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CampaignService } from 'src/app/services/campaigns.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated 
})
export class RoomModalComponent {

  openClose:boolean=false;
  constructor(public activeModal: NgbActiveModal) {}
  @ViewChild('nav') slider!: NgImageSliderComponent;
  isVisible:boolean=false;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  currentCampaignIndex = 0;
  @ViewChild('carousel')
  carousel!: NgbCarousel;
  @Input() room: any | undefined;

  ngOnInit(){
    console.log("room",this.room)
  }
  openCloseBtn(){
    this.openClose=!this.openClose;
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  featuresShowHideForMobil(){
    this.isVisible=!this.isVisible;
  }
}
