import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from "./campaigns.component";
import { RouterModule } from "@angular/router";
import { NgImageSliderModule } from 'ng-image-slider';

import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [CampaignsComponent],
  exports: [
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    NgImageSliderModule,
    NgbCarouselModule,
    CarouselModule.forRoot(),
    RouterModule.forChild([
      { path: "", component: CampaignsComponent }
    ])
  ]
})
export class CampaignsModule { }
