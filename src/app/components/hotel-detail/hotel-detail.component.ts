import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from 'src/app/services/hotels.service';
import { DataService } from 'src/app/services/search.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  hotelId: string="";
  hotel: any; 
  searchText: string = '';
  fromDate: NgbDate | null;
	toDate: NgbDate | null;
  counter: number = 0;
  counterChild: number = 0;
  searchSectionComponent: any;
  nightCount: number = 0;
  totalDiscountAmount: any;
  searchData: any;	
  showSearchSection :boolean= true;

	constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService,
		private calendar: NgbCalendar,

		protected formatter: NgbDateParserFormatter,

		private dataService: DataService
	) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}
  ngOnInit(): void {
    this.dataService.searchData$.subscribe((params: any) => {
      this.searchText = params?.searchText ?? null;
      this.fromDate = params?.fromDate || NgbDate;
      this.toDate = params?.toDate || NgbDate;
      this.nightCount = params?.nightCount || 0;
      this.counter = params?.counter || 0;
      this.counterChild = params?.counterChild || 0;
    
      this.searchData = {
        searchText: this.searchText,
        fromDate: this.fromDate,
        toDate: this.toDate,
        nightCount: this.nightCount,
        counter: this.counter,
        counterChild: this.counterChild
      };
    
      console.log("searchText", this.searchText);
      console.log("searchData", this.searchData);
    });
    

    this.route.params.subscribe(params => {
      this.hotelId = params['hotelId'];
      console.log("id",this.hotelId)
      this.getHotelDetails();
    });

  }

  getHotelDetails() {
    this.hotelsService.getHotelById(this.hotelId).subscribe((res: any) => {
      this.hotel = res;
    });     
  }

	ngbDateToDate(ngbDate: NgbDate | null): Date | null {
		return ngbDate ? new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day) : null;
	} 

  toggleSearchSection() {
    this.showSearchSection = !this.showSearchSection;
  }

}
