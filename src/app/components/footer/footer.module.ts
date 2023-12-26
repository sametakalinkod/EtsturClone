import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { FooterComponent } from './footer.component';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [FooterComponent],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: FooterComponent}
    ])
  ]
})
export class FooterModule { }
