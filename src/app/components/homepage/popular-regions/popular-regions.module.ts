import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularRegionsComponent } from "./popular-regions.component";
import { RouterModule } from "@angular/router";
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [PopularRegionsComponent],
  exports: [
    PopularRegionsComponent
  ],
  imports: [
    CommonModule,
     NgImageSliderModule,
      NgbCarouselModule, 
      CarouselModule.forRoot(),
    RouterModule.forChild([{ path: "", component: PopularRegionsComponent }])
  ]
})
export class PopularRegionsModule { }
