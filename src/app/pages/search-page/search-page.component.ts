import {Component, Input, OnInit} from '@angular/core';
import {ProductCategory} from "../../models/product-category";
import {ActivatedRoute} from "@angular/router";
import {FilterOptions} from "../../models/filter-options";
import {ProductCategoryDTO, ProductControllerService} from "../../services/api-service";
import {ProductCategoriesService} from "../../services/product-categories.service";

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  category? : string;
  gender?: string;
  query?: string;

  filterOptions!: FilterOptions;

  constructor(private activeRoute: ActivatedRoute, private productCategory: ProductCategoriesService ) {

  }

  ngOnInit(): void {
    this.subscribeToRouteChanges();
  }

  updateFilter(){
    this.filterOptions = new FilterOptions();

    if(this.query != undefined){
      this.filterOptions.title = this.query;
    }


    if(this.category != undefined){

      let categoryDTO =  this.productCategory.getCategoryByRawName(this.category)
      let categoryPath = categoryDTO?.getCategoryPath()

      this.filterOptions.primaryCat = categoryPath?.at(0)?.rawName
      this.filterOptions.secondaryCat = categoryPath?.at(1)?.rawName
      this.filterOptions.tertiaryCat = categoryPath?.at(2)?.rawName
    }

    if(this.gender != undefined)
      this.filterOptions.productGender = this.gender
  }

  subscribeToRouteChanges(){
    this.activeRoute.queryParams.subscribe(params=>{
      this.category = params['category'];
      this.gender = params['gender'];
      this.query = params['query'];
      this.updateFilter();
    })
  }

  buildFilterBar(){



  }
  /*if(categoryPath.length>2) {
          child = categoryPath[categoryPath.length - 1].rawName;
          secondary = categoryPath[categoryPath.length - 2].rawName;
          primary = categoryPath[categoryPath.length - 3].rawName;
        }
        else if(categoryPath.length>1){
          secondary = categoryPath[categoryPath.length - 1].rawName;
          primary = categoryPath[categoryPath.length - 2].rawName;
        }
        else
          primary = categoryPath[categoryPath.length - 1].rawName;*/
}
