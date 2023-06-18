import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category';
import { ProductControllerService, ProductDTO } from './api-service';
import { Observable, Subject, map } from 'rxjs';
import { ProductCategoryDTO } from './api-service/model/productCategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  /**
   * Emits when the categories are loaded
   */
  onCategoriesLoaded = new Subject<ProductCategory[]>();

  allCategories: ProductCategory[] = [];
  primaryCategories: ProductCategory[] = [];

  leafCategories: ProductCategory[] = [];

  /**
   * Maps the raw name of a category to the category object
   */
  categoriesMap: Map<string, ProductCategory> = new Map();


  constructor(private apiProductService: ProductControllerService) {
    this.loadCategories();
  }


  loadCategories() {
    return this.apiProductService.getCategoriesList().subscribe(
      (apiCategories: ProductCategoryDTO[]) => {
        console.log("categories: ", apiCategories);

        // get all distinct primary categories
        apiCategories.forEach((apiCategory) => {
          if (!this.categoriesMap.has(apiCategory.primaryCat)) {
            const category = new ProductCategory(apiCategory.primaryCat);
            this.allCategories.push(category);
            this.primaryCategories.push(category);
            this.categoriesMap.set(category.rawName, category);
          }
        });

        // get all distinct secondary categories
        apiCategories.forEach((apiCategory) => {
          if (!this.categoriesMap.has(apiCategory.secondaryCat)) {
            const category = new ProductCategory(apiCategory.secondaryCat, this.categoriesMap.get(apiCategory.primaryCat));
            this.allCategories.push(category);
            this.categoriesMap.set(category.rawName, category);
          }
        });


        // get all distinct tertiary categories
        apiCategories.forEach((apiCategory) => {
          if (!this.categoriesMap.has(apiCategory.tertiaryCat)) {
            const category = new ProductCategory(apiCategory.tertiaryCat, this.categoriesMap.get(apiCategory.secondaryCat), apiCategory.id);
            this.allCategories.push(category);
            this.categoriesMap.set(category.rawName, category);
          }
        });

        // populate the child categories of each category
        this.allCategories.forEach(category => {
          if (category.parentCategory) {
            category.parentCategory.addChildCategory(category);
          }
        })
        // get all leaf categories
        this.leafCategories = this.allCategories.filter(category => category.getChildren().length === 0);

        this.onCategoriesLoaded.next(this.allCategories);
      });
  }

  getCategoryByRawName(rawName: string): ProductCategory | null {
    return this.categoriesMap.get(rawName) ?? null;
  }

}
