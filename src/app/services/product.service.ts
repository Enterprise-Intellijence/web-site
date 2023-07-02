import { Injectable } from '@angular/core';
import { ProductControllerService } from './api-service';
import { FilterOptions } from '../models/filter-options';
import { Observable, map } from 'rxjs';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productControllerService: ProductControllerService) { }

  getFilteredProducts(filterOptions: FilterOptions) {
    return this.productControllerService.getFilteredProducts(
      filterOptions.title,
      filterOptions.description,
      filterOptions.minProductCost,
      filterOptions.maxProductCost,
      filterOptions.brands,
      filterOptions.condition,
      filterOptions.views,
      filterOptions.userId,
      filterOptions.uploadDate,
      filterOptions.availability,
      filterOptions.productCategory,
      filterOptions.primaryCat,
      filterOptions.secondaryCat,
      filterOptions.tertiaryCat,
      filterOptions.likesNumber,
      filterOptions.productGender,
      filterOptions.sizes,
      filterOptions.colour,
      filterOptions.entertainmentLanguage,
      filterOptions.homeMaterial,
      filterOptions.page,
      filterOptions.sizePage,
      filterOptions.sortBy,
      filterOptions.sortDirection);
  }


  getProductCapabilityURL(productID: string): Observable<string> {
    return this.productControllerService.createCapability(productID).pipe(
      map((capabilityDTO) => {
        return `${Config.webBasePath}/products/token/${capabilityDTO.capabilityToken}`;
      })
    )
  }
}
