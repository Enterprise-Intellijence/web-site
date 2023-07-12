import { Injectable } from '@angular/core';
import { ProductControllerService } from './api-service';
import { SizeDTO } from './api-service';
import { BehaviorSubject } from 'rxjs';
import { ProductCategory } from '../models/product-category';
import { ProductCategoriesService } from './product-categories.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSizesService {

  allSizes: SizeDTO[] = [];

  get areSizesLoaded() {
    return this.allSizes.length > 0;
  }

  onSizesLoaded = new BehaviorSubject<SizeDTO[]>([]);


  constructor(private apiProductService: ProductControllerService) {
    this.loadSizes();
  }

  public loadSizes() {
    this.apiProductService.getSizesList().subscribe(
      (apiSizes: SizeDTO[]) => {
        this.allSizes = apiSizes;
        this.onSizesLoaded.next(this.allSizes);
      }
    );
  }

  public  getAllSizes() {
    return this.allSizes;
  }


  /**
   * first, it checks if the category has any valid size, if not, it checks the parent category,
   * and so on until it finds some valid sizes.
   *
   * @returns all the sizes that are valid for the given category.
   */
  public getSizesForCategory(category: ProductCategory) {
    var sizes: SizeDTO[] = [];

    var currentCategory: ProductCategory | null = category;

    while (currentCategory != null && sizes.length == 0) {

      for (let size of this.allSizes) {
        if (size.type === currentCategory.rawName) {
          sizes.push(size);
        }
      }
      currentCategory = currentCategory.parentCategory;
    }
    return sizes;
  }

  /**
   * @returns true if the given size is valid for the given category.
  */
  public isSizeValidForCategory(category: ProductCategory, size: SizeDTO) {
    var sizes = this.getSizesForCategory(category);
    return sizes.includes(size);
  }

}
