import { Component, Input, OnChanges } from '@angular/core';
import { ProductBasicDTO, UserBasicDTO } from 'src/app/services/api-service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent implements OnChanges {

  @Input() user: UserBasicDTO | null = null;
  productPageMap: Map<number, Array<ProductBasicDTO>> = new Map<number, Array<ProductBasicDTO>>();
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(
    private productService: ProductService) { }

  ngOnChanges(): void {
    this.loadProducts();
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
