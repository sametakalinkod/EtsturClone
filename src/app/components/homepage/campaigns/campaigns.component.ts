import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from 'src/app/services/campaigns.service';
import { NgImageSliderComponent } from 'ng-image-slider';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})

export class CampaignsComponent implements OnInit {

  @ViewChild('nav') slider!: NgImageSliderComponent;
  isActiveIndex: number = -1;
  campaigns: any[] = []
  campaingsSlider: any[] = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  campaignIndex = 0;
  @ViewChild('carousel')
  carousel!: NgbCarousel;
  changeText: boolean = false;
  imgId: any;
  imgWrapper: any;
  currentIndex: number = 0;
  scrollSlider:any;
  constructor(private campaignService: CampaignService) {

  }

  ngOnInit() {

    this.campaign();
    this.changeText = false;
    this.sliderAllCampaign();
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

  // sliderCampaign() {
  //   this.campaignService.getAllCampaigns().subscribe((data: any) => {
  //     this.campaigns = data;
  //   })
  // }

  campaign() {
    this.campaignService.getCampaign().subscribe((res: any) => {
      this.campaingsSlider = res;
    })
  }

  setActiveIndex(index: number): void {
    this.isActiveIndex = index;
  }

  resetActiveIndex(): void {
    this.isActiveIndex = -1;
  }

  sliderAllCampaign() {
    const screenWidth = window.innerWidth;

    setInterval(() => {
      const imgId = document.querySelector('#imgSection');
      const imgWrapper = document.querySelector('.campaignTextWrapper');

      if (this.isActiveIndex == -1) {
        this.imgId = (this.imgId + 1) % this.campaingsSlider.length;

        if (this.campaingsSlider.length * 250 > screenWidth) {

          this.campaingsSlider.push(this.campaingsSlider.shift());

          /*bu satırda, dizinin sonundaki elemanı dizinin başına ekler (push), ve ardından dizinin başındaki elemanı çıkarır (shift).
          Bu işlem, diziyi bir önceki konuma kaydırmaya benzer. Bu işlem, kampanyaların bir süre sonra yer değiştirmesini sağlar.*/
        }
      } else if (this.imgWrapper == this.isActiveIndex) {
        this.isActiveIndex = (this.isActiveIndex + 1) % this.campaingsSlider.length;
        if (this.campaingsSlider.length * 150 > screenWidth) {
          this.campaingsSlider.push(this.campaingsSlider.shift());
        }
      }

    }, 1500)
  }


  leftArrow() {
    this.currentIndex = this.currentIndex === 0 ? this.campaigns.length - 1 : this.currentIndex - 1;
  }

  rightArrow() {
    this.currentIndex = this.currentIndex === this.campaigns.length - 1 ? 0 : this.currentIndex + 1;
  }

  
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const scrollSlider=document.querySelector('.scrollMobile');
    event.deltaX > 0 ? scrollSlider!.scrollLeft+=30 : scrollSlider!.scrollLeft-=30
  }


}
