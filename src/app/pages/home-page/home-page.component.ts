import {Component, OnInit} from '@angular/core';
import {FilterOptions} from "../../models/filter-options";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  filterMostRequest!: FilterOptions;
  filterMostRecent!: FilterOptions;

  constructor() {
  }
  ngOnInit(): void {
    this.filterMostRequest = new FilterOptions();
    this.filterMostRequest.sortBy = "likesNumber"

    this.filterMostRecent = new FilterOptions();


  }

}
