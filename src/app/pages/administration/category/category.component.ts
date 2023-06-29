import {Component, OnInit} from '@angular/core';
import {ProductCategoriesService} from "../../../services/product-categories.service";
import {ProductCategory} from "../../../models/product-category";

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  allCategories?: Array<ProductCategory>
  primaryCategory?: Array<ProductCategory>
  secondaryCategory?: Array<ProductCategory>

  leafCategory?: Array<ProductCategory>

  constructor(private categoryService: ProductCategoriesService) {
  }

  ngOnInit(): void {
    this.allCategories = this.categoryService.allCategories
    this.primaryCategory = this.categoryService.primaryCategories
    this.secondaryCategory = this.categoryService.allCategories
    this.leafCategory = this.categoryService.leafCategories

    for (const category of this.allCategories) {
      if (!category.parentCategory) {
        this.primaryCategory.push(category);
      }
      else if(!category.childCategories)
        this.leafCategory.push(category)
      else
        this.secondaryCategory.push(category)
    }


  }

}
