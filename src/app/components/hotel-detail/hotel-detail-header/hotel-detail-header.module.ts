import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HotelDetailHeaderComponent } from './hotel-detail-header.component';
import { SearchSectionModule } from 'src/app/common/search-section/search-section.module';
import { DiscountModalComponent } from './discount-modal/discount-modal.component';
import { HoneymooModalComponent } from './honeymoo-modal/honeymoo-modal.component';



@NgModule({
  declarations: [HotelDetailHeaderComponent, DiscountModalComponent, HoneymooModalComponent],
  exports: [
    HotelDetailHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: HotelDetailHeaderComponent }])
  ]
})
export class HotelDetailHeaderModule { }
