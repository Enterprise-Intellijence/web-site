import { Component } from '@angular/core';
import { ProductBasicDTO, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent {

  user: UserDTO | null = null;
  productPageMap: Map<number, Array<ProductBasicDTO>> = new Map<number, Array<ProductBasicDTO>>();
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private currentUserService: CurrentUserService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
      this.loadProducts();
    })
  }

  loadProducts() {
    this.productService.getFilteredProducts({
      userId: this.user?.id,
      page: this.pageNumber - 1,
      sizePage: this.pageSize,
    }).subscribe(page => {
      this.productPageMap.set(this.pageNumber, page.content!);
      this.totalPages = page.totalPages!;
      this.totalElements = page.totalElements!;
    });
  }

  changePage() {
    this.loadProducts();
  }
}
