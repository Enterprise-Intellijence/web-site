import { Injectable } from '@angular/core';
import { ProductDTO } from './api-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLikesService {


  LikedProductsSet = new Set<ProductDTO>();

  LikedProducts$ = new BehaviorSubject<ProductDTO[]>([]);
  LikedProductsCount$ = new BehaviorSubject<number>(0);




  constructor() { }


  public likeProduct(product: ProductDTO) {
    this.LikedProductsSet.add(product);
    this.updateLikedProducts();
  }

  public unlikeProduct(product: ProductDTO) {
    this.LikedProductsSet.delete(product);
    this.updateLikedProducts();
  }

  public toggleLikeProduct(product: ProductDTO) {
    if (this.isProductLiked(product)) {
      this.unlikeProduct(product);
    }
    else {
      this.likeProduct(product);
    }
  }

  public isProductLiked(product: ProductDTO) {
    return this.LikedProductsSet.has(product);
  }

  updateLikedProducts() {
    this.LikedProducts$.next(Array.from(this.LikedProductsSet));
    this.LikedProductsCount$.next(this.LikedProductsSet.size);
  }


}
