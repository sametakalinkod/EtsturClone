import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { HeaderComponent } from './header.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';



@NgModule({
  declarations: [HeaderComponent, HeaderModalComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: HeaderComponent}
    ])
  ]
})
export class HeaderModule { }
