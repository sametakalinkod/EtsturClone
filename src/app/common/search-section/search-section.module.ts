import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { SearchComponent } from 'src/app/components/homepage/search/search.component';
import { RouterModule } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchSectionComponent } from './search-section.component';

import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchSectionComponent],
  exports: [SearchSectionComponent],
  imports: [
    CommonModule,
    JsonPipe,
    NgbModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule, 
    RouterModule.forChild([
      { path: "", component: SearchSectionComponent }
    ])
  ]
})
export class SearchSectionModule { }
