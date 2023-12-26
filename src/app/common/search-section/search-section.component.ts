import { DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from '../../services/search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-search-section',
	templateUrl: './search-section.component.html',
	styleUrls: ['./search-section.component.scss'],
	providers: [DatePipe]
})
export class SearchSectionComponent implements OnInit {

	@Input() searchData: any;
	nightCountWithFromMonth: number = 0;
	nightCount: number = 0;
	nightCountCurrentMonth: number = 0;
	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null;
	showCounterSection: boolean = false;
	counter: number = 2;
	counterChild: number = 0;
	searchText: string = "";
	counters: number[] = [];

	@HostListener('window:resize', ['$event'])
	ngOnInit(): void { }
	constructor(
		private calendar: NgbCalendar,
		private router: Router,
		protected formatter: NgbDateParserFormatter,
		private datePipe: DatePipe,
		private dataService: DataService,
		private modalService: NgbModal,
	) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	updateNightCount() {
		if (this.fromDate && this.toDate) {
			if (this.fromDate.month === this.toDate.month) {
				this.nightCount = this.toDate.day - this.fromDate.day;
			} else {
				const daysInFromMonth = this.daysInMonth(this.fromDate.month, this.fromDate.year);
				const daysInToMonth = this.daysInMonth(this.toDate.month, this.toDate.year);

				const dayCount = daysInFromMonth - this.fromDate.day + this.toDate.day;
				this.nightCount = dayCount;
			}
		}
	}

	daysInMonth(month: number, year: number) {
		return new Date(year, month, 0).getDate();
	}


	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
		this.updateNightCount();
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;

	}
	toggleCounterSection() {
		this.showCounterSection = !this.showCounterSection;
	}
	increment() {
		if (this.counter < 10) {
			this.counter++;
		}

	}

	decrement() {
		if (this.counter > 0) {
			this.counter--;
		}

	}
	updateCounters() {
		this.counters = Array.from({ length: this.counterChild }, (_, i) => this.counters[i] || 1);
	}

	incrementChild() {
		if (this.counterChild < 4) {
			this.counterChild++;
			this.updateCounters();
		}
	}

	decrementChild() {
		if (this.counterChild > 0) {
			this.counterChild--;
			this.updateCounters();
		}
	}


	searchHotels() {
		const searchData = {
			searchText: this.searchText,
			fromDate: this.fromDate,
			toDate: this.toDate,
			nightCount: this.nightCount,
			counter: this.counter,
			counterChild: this.counterChild
		}
		this.dataService.updateSearchData(searchData);
		this.router.navigate(['/hotels']);
		console.log("this.searchData", searchData)
	}

	ngbDateToDate(ngbDate: NgbDate | null): Date | null {
		return ngbDate ? new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day) : null;
	}

}

