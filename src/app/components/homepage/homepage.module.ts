import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsModule } from "./campaigns/campaigns.module";
import { FooterInfoModule } from "./footer-info/footer-info.module";
import { HolidayThemesModule } from "./holiday-themes/holiday-themes.module";
import { PopularRegionsModule } from "./popular-regions/popular-regions.module";
import { SearchModule } from "./search/search.module";
import { HomepageComponent } from './homepage.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    CampaignsModule,
    FooterInfoModule,
    HolidayThemesModule,
    PopularRegionsModule,
    SearchModule,
    NgImageSliderModule,
    NgbDatepickerModule,
    NgbModule,
    CarouselModule.forRoot()
  ]
})
export class HomepageModule { }
