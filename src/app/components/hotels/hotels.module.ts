import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { SearchSectionModule } from 'src/app/common/search-section/search-section.module';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [HotelsComponent, FilterComponent],
  imports: [
    CommonModule,
    SearchSectionModule,
    FormsModule,
    RouterModule
  ]
})
export class HotelsModule { }
