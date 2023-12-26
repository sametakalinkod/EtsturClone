import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailLocaitonComponent } from './hotel-detail-locaiton.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HotelDetailLocaitonComponent],
  exports:[HotelDetailLocaitonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: "", component: HotelDetailLocaitonComponent }])

  ]
})
export class HotelDetailLocationModule { }
