import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailUserReviewComponent } from './hotel-detail-user-review.component';
import { RouterModule } from '@angular/router';
import { MobileUserReviewsComponent } from './mobile-user-reviews/mobile-user-reviews.component';



@NgModule({
  declarations: [HotelDetailUserReviewComponent, MobileUserReviewsComponent],
  exports:[HotelDetailUserReviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: HotelDetailUserReviewComponent }])

  ]
})
export class HotelDetailUserReviewModule { }
