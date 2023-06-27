import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from "../../models/product-category";
import {ActivatedRoute} from "@angular/router";
import {FilterOptions} from "../../models/filter-options";

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  primaryCat? : string | undefined
  secondaryCat?:string | undefined

  tertiaryCat?:string | undefined
  gender?: string
  filterOptions!: FilterOptions;


  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.setRouteSubscribe();
  }

  updateFilter(){
    console.log(this.primaryCat,this.secondaryCat,this.tertiaryCat)
    this.filterOptions = new FilterOptions();
    if(this.primaryCat !== undefined)
      this.filterOptions.primaryCat = this.primaryCat
    if(this.secondaryCat !== undefined)
      this.filterOptions.secondaryCat = this.secondaryCat

    if(this.tertiaryCat !== undefined)
      this.filterOptions.tertiaryCat = this.tertiaryCat

    if(this.gender !== undefined)
      this.filterOptions.productGender = this.gender
  }

  setRouteSubscribe(){
    this.activeRoute.queryParams.subscribe(params=>{
      this.primaryCat = params['primary'];
      this.secondaryCat = params['secondary'];
      this.tertiaryCat = params['child'];
      this.gender = params['gender'];
      this.updateFilter();
    })
  }

}
