import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageModule} from "./homepage/homepage.module";
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchSectionModule } from '../common/search-section/search-section.module';
import { HotelsModule } from './hotels/hotels.module';
import { FormsModule } from '@angular/forms';
import { HotelDetailModule } from './hotel-detail/hotel-detail.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    HomepageModule,
    NgImageSliderModule,
    SearchSectionModule,
    HotelsModule,
    FormsModule,
    NgbModule,
    HotelDetailModule,
    RouterModule,
    CarouselModule.forRoot(),
  ]
})
export class ComponentsModule{ }
