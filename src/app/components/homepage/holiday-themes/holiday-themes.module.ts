import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HolidayThemesComponent} from "./holiday-themes.component";
import {RouterModule} from "@angular/router";
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [HolidayThemesComponent],
  exports: [
    HolidayThemesComponent
  ],
  imports: [
    CommonModule,NgbCarouselModule,
    CarouselModule.forRoot(),
    RouterModule.forChild([{path: "", component: HolidayThemesComponent}])
  ]
})
export class HolidayThemesModule { }
