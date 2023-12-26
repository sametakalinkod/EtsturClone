import { HotelsService } from 'src/app/services/hotels.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/search.service';
import { FilterService } from 'src/app/services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  fromDate: NgbDate | null;
	toDate: NgbDate | null;
  searchData: any;
  hotels: any[] = [];
  filteredHotels: any[] = [];
  filters: any[] = [];
  isVisible:any
  showFilters: boolean = false;
  selectedFilters: any = {
    rate: [],
    accommodationType: [],
    amenities: [],
    location: []
  };
  searchText: string = '';
 
  counter: number = 0;
  counterChild: number = 0;
  searchSectionComponent: any;
  nightCount: number = 0;
  totalDiscountAmount: any;

  originalHotels: any[] = [];
  showSearchSection:boolean=false;
  route: any;
  constructor(
    private hotelsService: HotelsService,
    private filterService: FilterService,
    private modalService: NgbModal,
    private dataService: DataService,
    private routeActive: ActivatedRoute,
    private calendar: NgbCalendar
  ) {	this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10); }

  ngOnInit(): void {
    this.getHotel();
    this.getFilter();

    this.dataService.searchData$.subscribe((params: any) => {
      this.searchText = params?.searchText ?? null;
      this.fromDate = params?.fromDate || new Date();
      this.toDate = params?.toDate || new Date();
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
    
    this.route.queryParams.subscribe((params: { searchData: any; }) => {
      console.log(params.searchData);
    });
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent);
  }
  openFilter() {
    const modalRef = this.modalService.open(FilterComponent);
    //modaldan gönderilen veriyi burada karışladım
    modalRef.componentInstance.onFilterApplied.subscribe((filteredData: any) => {
      console.log("BURASIIIIIIIIIIIIIIIIIII", filteredData);
      this.filteredHotels = filteredData;
    });
  }
  getHotel() {
    this.hotelsService.getHotels().subscribe((res: any) => {
      this.hotels = res;
      this.filteredHotels = this.hotels;
      this.originalHotels = this.hotels;
    });
  }

  getFilter() {
    this.filterService.getFilters().subscribe((res: any) => {
      this.filters = res.map((item: any) => {
        
        if (item.options && item.options.every((option: any) => typeof option === 'string')){
          const mappedOptions = item.options.map((option: string) => {
            return {
              name: option,
              isSelected: false
            };
          });
          return {
            ...item,
            options: mappedOptions
          };
        } else {

          const mappedOptions = item.options.map((option: { name: string, filterArea: string}) => {
            return {
              name: option.name,
              filterArea: option.filterArea,
              isSelected: false
            };
          });
          return {
            ...item,
            options: mappedOptions
          };
        }
      });
    });
  }

  getFilteredOptions(options: any[], showAll: boolean, displayCount: number): any[] {
    return showAll ? options : options.slice(0, displayCount);
  }

  onCheckboxChange(event: any, option: any, areadef: any) {
    
    const filterArray = this.selectedFilters[areadef ?? option.filterArea ];

    this.updateFilterArray(option.name, event.target.checked, filterArray);

    this.filteredHotels = this.hotels.filter(hotel => {
      return this.selectedFilters.rate.every((filter: any) => this.filterByRate(hotel, filter)) &&
        this.selectedFilters.accommodationType.every((filter: any) => this.filterByAccommodationType(hotel, filter)) &&
        this.selectedFilters.amenities.every((filter: any) => this.filterByAmenities(hotel, filter)) &&
        this.selectedFilters.location.every((filter: any) => this.filterByLocation(hotel, filter));
    });
  }

  updateFilterArray(value: any, isChecked: boolean, filterArray: any) {
    const optionIndex = filterArray.findIndex((item: { name: any; }) => item.name === value);

    if (isChecked) {
      if (optionIndex === -1) {
        filterArray.push({ name: value, isSelected: true });
      }
    } else {
      if (optionIndex !== -1) {
        filterArray.splice(optionIndex, 1);
      }
    }
  }

  filterByRate(hotel: any, filter: any): boolean {
    const minRate = this.getMinimumRate(filter.name);
    return parseFloat(hotel.rate) >= minRate;
  }

  filterByAccommodationType(hotel: any, filter: any): boolean {
    return hotel.accommodationType === filter.name;
  }

  filterByAmenities(hotel: any, filter: any): boolean {
    return hotel.amenities.includes(filter.name);
  }

  filterByLocation(hotel: any, filter: any): boolean {
    return hotel.location.includes(filter.name);
  }

  getMinimumRate(rateOption: string): number {
    switch (rateOption) {
      case '9 ve Üstü':
        return 9;
      case '8 ve Üstü':
        return 8;
      case '7 ve Üstü':
        return 7;
      case '6 ve Üstü':
        return 6;
      default:
        return 0;
    }
  }

  calculateTotalAmount(hotel: any): number {

    const totalAmount = hotel.amount * this.nightCount * this.counter ;

    return totalAmount;
  }

  calculeDiscountPrices(hotel: any): number {
    const discountAmount = (hotel.amount * hotel.discount) / 100;
    const discountedPrice = hotel.amount - discountAmount;
    const totalDiscountAmount = discountedPrice * this.nightCount;

    return totalDiscountAmount;

  }

  sortHotels(event: any): void {
    console.log("event", event)

    switch (event.value) {
      case 'priceAsc':
        this.filteredHotels.sort((a, b) => {
          const amountA = a.discount ? this.calculeDiscountPrices(a) : this.calculateTotalAmount(a);
          const amountB = b.discount ? this.calculeDiscountPrices(b) : this.calculateTotalAmount(b);
          return amountA - amountB;
        });
        break;
      case 'priceDesc':
        this.filteredHotels.sort((a, b) => {
          const amountA = a.discount ? this.calculeDiscountPrices(a) : this.calculateTotalAmount(a);
          const amountB = b.discount ? this.calculeDiscountPrices(b) : this.calculateTotalAmount(b);
          return amountB - amountA;
        });
        break;
      case 'defaulSorting':

        //buraya tekrar bakıcam, ets tur sıralaması olarak geçiyor ama bunu onlar neye göre yaptı bilmiyorum. 
       

        this.filteredHotels = this.originalHotels;
        break;
      case 'scoreDesc':
        this.filteredHotels.sort((a, b) => b.rate - a.rate);
        break;
      default:

    }
  }


  showMobilFilters() {
    this.showFilters = !this.showFilters
  }
  openSort(){
    this.isVisible=!this.isVisible;
  }
	ngbDateToDate(ngbDate: NgbDate | null): Date | null {
		return ngbDate ? new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day) : null;
	} 

  toggleSearchSection() {

    this.showSearchSection = !this.showSearchSection;
  }

	
}
