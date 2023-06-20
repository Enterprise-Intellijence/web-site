import { Injectable } from '@angular/core';
import { ProductBasicDTO, UserControllerService } from './api-service';
import { BehaviorSubject, Observable, map, pipe, tap, throwError } from 'rxjs';
import { ApiAuthService } from './api-auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserLikesService {


  LikedProductsSet = new Set<ProductBasicDTO>();

  LikedProducts$ = new BehaviorSubject<ProductBasicDTO[]>([]);
  LikedProductsCount$ = new BehaviorSubject<number>(0);

  constructor(
    private userService: UserControllerService,
    private apiAuth: ApiAuthService,
    private alert: AlertService) {
    this.apiAuth.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn)
        this.getAllLikedProducts();
    });
  }


  public likeProduct(product: ProductBasicDTO): Observable<any> {
    if (product.id == undefined)
      return throwError(() => new Error("Product id is undefined"));

    return this.userService.like(product.id).pipe(
      tap({
        next: () => {
          if (!this.apiAuth.isLoggedIn()) {
            this.alert.error("You need to be logged in to like products");
            throw (() => new Error("You need to be logged in to like products"));
          }

          this.LikedProductsSet.add(product);
          this.updateLikedProducts();
        }
      })
    );
  }



  public unlikeProduct(product: ProductBasicDTO): Observable<any> {
    if (product.id == undefined)
      return throwError(() => new Error("Product id is undefined"));

    return this.userService.unlike(product.id).pipe(
      tap({
        next: () => {
          if (!this.apiAuth.isLoggedIn()) {
            this.alert.error("You need to be logged in to like products");
            throw (() => new Error("You need to be logged in to like products"));
          }

          this.LikedProductsSet.delete(product);
          this.updateLikedProducts();
        }
      })
    );
  }

  public toggleLikeProduct(product: ProductBasicDTO): Observable<any> {
    if (this.isProductLiked(product)) {
      return this.unlikeProduct(product);
    }
    else {
      return this.likeProduct(product);
    }
  }

  public isProductLiked(product: ProductBasicDTO) {
    return this.LikedProductsSet.has(product);
  }

  private updateLikedProducts() {
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
