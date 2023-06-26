import { Injectable } from '@angular/core';
import { ProductBasicDTO, ProductControllerService, UserControllerService } from './api-service';
import { BehaviorSubject, Observable, map, pipe, tap, throwError } from 'rxjs';
import { ApiAuthService } from './api-auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserLikesService {


  LikedProductsIdSet = new Set<string>();
  LikedProductsSet = new Set<ProductBasicDTO>();

  LikedProducts$ = new BehaviorSubject<Set<ProductBasicDTO>>(this.LikedProductsSet);
  LikedProductsCount$ = new BehaviorSubject<number>(0);

  constructor(
    private userService: UserControllerService,
    private productService: ProductControllerService,
    private apiAuth: ApiAuthService,
    private alert: AlertService) { // TODO: use toast service instead of alert service
    this.apiAuth.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn)
        this.getAllLikedProducts();
    });
  }


  public likeProductById(id: string): Observable<any> {
    if (!this.apiAuth.isLoggedIn()) {
      this.alert.error("You need to be logged in to like products");
      return throwError(() => new Error("You need to be logged in to like products"));
    }

    return this.userService.like(id).pipe(
      tap({
        next: () => {
          this.LikedProductsIdSet.add(id);
          this.productService.productBasicById(id).subscribe(product => {
            this.LikedProductsSet.add(product);
            this.updateLikedProducts();
          });
        }
      })
    );
  }


  public likeProduct(product: ProductBasicDTO): Observable<any> {
    if (product.id == undefined)
      return throwError(() => new Error("Product id is undefined"));

    return this.likeProductById(product.id);
  }



  public unlikeProductById(id: string): Observable<any> {
    if (!this.apiAuth.isLoggedIn()) {
      this.alert.error("You need to be logged in to like or unlike products");
      return throwError(() => new Error("You need to be logged in to like or unlike products"));
    }


    return this.userService.unlike(id).pipe(
      tap({
        next: () => {
          this.LikedProductsIdSet.delete(id);
          let product = Array.from(this.LikedProductsSet).find(product => product.id == id);
          if (product != undefined)
            this.LikedProductsSet.delete(product);

          this.updateLikedProducts();
        }
      })
    );
  }


  public unlikeProduct(product: ProductBasicDTO): Observable<any> {
    if (product.id == undefined)
      return throwError(() => new Error("Product id is undefined"));

    return this.unlikeProductById(product.id);
  }





  public toggleLikeProductById(id: string): Observable<any> {
    if (this.isProductLikedById(id)) {
      return this.unlikeProductById(id);
    }
    else {
      return this.likeProductById(id);
    }
  }

  public toggleLikeProduct(product: ProductBasicDTO): Observable<any> {
    if (this.isProductLiked(product)) {
      return this.unlikeProduct(product);
    }
    else {
      return this.likeProduct(product);
    }

  }

  public isProductLikedById(id: string) {
    return this.LikedProductsIdSet.has(id);
  }

  public isProductLiked(product: ProductBasicDTO) {
    return this.LikedProductsSet.has(product) || this.isProductLikedById(product.id!);
  }


  private updateLikedProducts() {
    this.LikedProducts$.next(this.LikedProductsSet);
    this.LikedProductsCount$.next(this.LikedProductsSet.size);
  }

  private getAllLikedProducts() {
    this.LikedProductsSet.clear();
    this.LikedProductsIdSet.clear();
    this.getLikedProductsPageRecursive();
  }

  private getLikedProductsPageRecursive(page: number = 0) {
    const PAGE_SIZE = 50;

    this.userService.getLikedProducts(page, PAGE_SIZE).subscribe({
      next: (productsPage) => {
        if (productsPage.content != undefined) {
          productsPage.content.forEach(product => {
            this.LikedProductsIdSet.add(product.id!);
            this.LikedProductsSet.add(product);
          });
        }

        if (productsPage.last == true) {
          this.updateLikedProducts();
        }
        else
          this.getLikedProductsPageRecursive(page + 1);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
