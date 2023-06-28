import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from "../../models/product-category";
import {ActivatedRoute} from "@angular/router";
import {FilterOptions} from "../../models/filter-options";
import {ProductCategoryDTO, ProductControllerService} from "../../services/api-service";

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

  primaryList?: Array<String>
  secondaryList?: Array<String>
  tertiaryList?: Array<String>

  tempList?: Array<ProductCategoryDTO>




  constructor(private activeRoute: ActivatedRoute, private productService : ProductControllerService) {

  }

  ngOnInit(): void {
    this.productService.getCategoriesList().subscribe({
      next:(value:any)=>{
        this.tempList = value
      }
    })
    this.buildFilterBar();
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

  buildFilterBar(){



  }

}
