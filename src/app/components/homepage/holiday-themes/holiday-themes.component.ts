import { Component, OnInit } from '@angular/core';
import { HolidayThemesService } from 'src/app/services/holidayThemes';

@Component({
  selector: 'app-holiday-themes',
  templateUrl: './holiday-themes.component.html',
  styleUrls: ['./holiday-themes.component.scss']
})
export class HolidayThemesComponent implements OnInit {
  themes: any;
  currentCampaignIndex = 0;
  currentSlide = 0;

  constructor(private holidayThemeService: HolidayThemesService) {}

  ngOnInit(): void {
    this.getHolidayTheme();
  }

  getHolidayTheme() {
    this.holidayThemeService.getHolidayThemes().subscribe((res: any) => {
      this.themes = res;
    });
  }

  getVisibleThemes() {
    if (this.themes) {
      const startIndex = this.currentCampaignIndex * 4;
      return this.themes.slice(startIndex, startIndex + 4);
    }
    return [];
  }

  leftArrow() {
    this.currentCampaignIndex = (this.currentCampaignIndex === 0)
      ? Math.floor(this.themes.length / 4) : (this.currentCampaignIndex - 1);
  }

  rightArrow() {
    this.currentCampaignIndex = (this.currentCampaignIndex === Math.floor(this.themes.length / 4))
      ? 0 : (this.currentCampaignIndex + 1);
  }
  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const scrollSlider=document.querySelector('.scrollMobile');
    event.deltaX > 0 ? scrollSlider!.scrollLeft+=30 : scrollSlider!.scrollLeft-=30
  }
}
