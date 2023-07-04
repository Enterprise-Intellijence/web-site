import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageProductBasicDTO, ProductBasicDTO } from "../../services/api-service";
import { FilterOptions } from "../../models/filter-options";
import { ProductService } from "../../services/product.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  styleUrls: ['./filtered-product-list.component.scss'],

})
export class FilteredProductListComponent implements OnInit, OnChanges {

  @Input() customLoadMethod?: (page: number, pageSize: number) => Observable<PageProductBasicDTO>;
  @Input() filter!: FilterOptions
  @Output() isProductEmpty = new EventEmitter<boolean>();

  products: ProductBasicDTO[] = [];
  numberElements: number = 0;

  /** Page number starts at 1 */
  userPage: number = 1;

  get page() { return this.userPage -1; }
  pageSize: number = 12;
  hideProduct: boolean = false;

  constructor(private productService: ProductService) {
    this.numberElements = 0
    this.userPage = 1
    this.pageSize = 12
  }

  ngOnInit(): void {
    this.refreshProducts()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.refreshProducts();
    }
  }

  getFilteredPage(page: number, pageSize: number): Observable<PageProductBasicDTO> {
    this.filter.page = this.page
    this.filter.sizePage = this.pageSize
    return this.productService.getFilteredProducts(this.filter);
  }


  refreshProducts() {
    var loadMethod = this.customLoadMethod || this.getFilteredPage.bind(this);

    loadMethod(this.page, this.pageSize).subscribe({
        next: (page: PageProductBasicDTO) => {

          if (page.totalElements == 0) {
            this.isProductEmpty.emit(true);
            this.hideProduct = true;
          } else {
            this.isProductEmpty.emit(false);
            this.hideProduct = false;
          }

          this.products = page.content!
          this.numberElements = page.totalElements!
        }
      })
  }
}
