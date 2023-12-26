import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailInformationComponent } from './hotel-detail-information.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MobileHotelInformationComponent } from './mobile-hotel-information/mobile-hotel-information.component';



@NgModule({
  declarations: [HotelDetailInformationComponent, MobileHotelInformationComponent],
  exports: [
    HotelDetailInformationComponent
  ],
  imports: [
    CommonModule,    CarouselModule.forRoot(),
    RouterModule.forChild([{ path: "", component: HotelDetailInformationComponent }])
  ]
})
export class HotelDetailInformationModule { }
