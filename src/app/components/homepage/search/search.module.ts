import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./search.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbDatepickerModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchSectionModule } from 'src/app/common/search-section/search-section.module';

@NgModule({
  declarations: [SearchComponent],
  exports: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JsonPipe,
    NgbDatepickerModule,
    SearchSectionModule,
    NgbModule,
    RouterModule.forChild([{ path: "", component: SearchComponent }])
  ]
})
export class SearchModule { }
