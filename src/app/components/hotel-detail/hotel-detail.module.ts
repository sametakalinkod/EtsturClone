import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail.component';
import { HotelDetailHeaderModule } from './hotel-detail-header/hotel-detail-header.module';
import { HotelDetailInformationModule } from './hotel-detail-information/hotel-detail-information.module';
import { HotelDetailLocationModule } from './hotel-detail-locaiton/hotel-detail-location.module';
import { HotelDetailRoomModule } from './hotel-detail-room/hotel-detail-room.module';
import { HotelDetailUserReviewModule } from './hotel-detail-user-review/hotel-detail-user-review.module';
import { RouterModule } from '@angular/router';
import { SearchSectionModule } from 'src/app/common/search-section/search-section.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    HotelDetailComponent
  ],
  imports: [
    CommonModule,
    HotelDetailHeaderModule,
    HotelDetailInformationModule,
    HotelDetailLocationModule,
    HotelDetailRoomModule,
    HotelDetailUserReviewModule,
    RouterModule,
    SearchSectionModule, 
    NgbCarouselModule,
    CarouselModule.forRoot(),
  ]
})
export class HotelDetailModule { }
