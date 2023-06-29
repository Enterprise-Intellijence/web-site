import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { PageProductBasicDTO } from "../../services/api-service";
import {FilterOptions} from "../../models/filter-options";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  styleUrls: ['./filtered-product-list.component.scss'],

})
export class FilteredProductListComponent implements OnInit,OnChanges {
  @Input() filter!: FilterOptions
  @Output() isProductEmpty = new EventEmitter<boolean>();

  products?: PageProductBasicDTO = { content: [] };
  numberElements: any;
  page: number = 1;
  pageSize: any;
  hideProduct: boolean = false;

  constructor(private productService: ProductService) {
    this.numberElements=0
    this.page = 1
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


  refreshProducts() {
    this.filter.page = this.page -1
    this.filter.sizePage = this.pageSize
    this.productService.getFilteredProducts(this.filter).subscribe({
      next: (page: PageProductBasicDTO) => {

        if (page.totalElements == 0) {
          this.isProductEmpty.emit(true);
          this.hideProduct = true;
        } else {
          this.isProductEmpty.emit(false);
          this.hideProduct = false;
        }

        this.products = page
        this.numberElements = page.totalElements
      }
    })
  }
}
