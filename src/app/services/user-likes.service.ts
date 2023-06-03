import { Injectable } from '@angular/core';
import { ProductBasicDTO, UserControllerService } from './api-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLikesService {


  LikedProductsSet = new Set<ProductBasicDTO>();

  LikedProducts$ = new BehaviorSubject<ProductBasicDTO[]>([]);
  LikedProductsCount$ = new BehaviorSubject<number>(0);

  constructor(private userService: UserControllerService) {
    this.getAllLikedProducts();
  }


  public likeProduct(product: ProductBasicDTO) {
    if (product.id == undefined)
      throw new Error("Product id is undefined");

    this.userService.like(product.id).subscribe({
      next: () => {
        this.LikedProductsSet.add(product);
        this.updateLikedProducts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public unlikeProduct(product: ProductBasicDTO) {
    if (product.id == undefined)
      throw new Error("Product id is undefined");

    this.userService.unlike(product.id).subscribe({
      next: () => {
        this.LikedProductsSet.delete(product);
        this.updateLikedProducts();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public toggleLikeProduct(product: ProductBasicDTO) {
    if (this.isProductLiked(product)) {
      this.unlikeProduct(product);
    }
    else {
      this.likeProduct(product);
    }
  }

  public isProductLiked(product: ProductBasicDTO) {
    return this.LikedProductsSet.has(product);
  }

  updateLikedProducts() {
    this.LikedProducts$.next(Array.from(this.LikedProductsSet));
    this.LikedProductsCount$.next(this.LikedProductsSet.size);
  }

  private getAllLikedProducts() {
    this.LikedProductsSet.clear();
    this.getNextLikedProductsPage(0);
  }

  private getNextLikedProductsPage(page: number) {
    const PAGE_SIZE = 50;

    this.userService.getLikedProducts(page, PAGE_SIZE).subscribe({
      next: (productsPage) => {
        if (productsPage.content != undefined) {
          productsPage.content.forEach(product => {
            this.LikedProductsSet.add(product);
          });
        }

        if (productsPage.last == true) {
          this.updateLikedProducts();
        }
        else
          this.getNextLikedProductsPage(page + 1);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
