import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterInfoComponent} from "./footer-info.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [FooterInfoComponent],
  exports: [
    FooterInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: FooterInfoComponent}
    ])
  ]
})
export class FooterInfoModule { }
