import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { PageProductBasicDTO, ProductBasicDTO, ProductControllerService } from "../../services/api-service";
import {FilterOptions} from "../../models/filter-options";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'filtered-product-list',
  templateUrl: './filtered-product-list.component.html',
  styleUrls: ['./filtered-product-list.component.scss'],

})
export class FilteredProductListComponent implements OnInit,OnChanges {
  @Input() filter!: FilterOptions
  products?: PageProductBasicDTO = { content: [] };
  numberElements: any;
  page: any;
  pageSize: any;

  constructor(private productService: ProductService) {
    this.numberElements=0
    this.page = 1
    this.pageSize = 10
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
        this.products = page
        this.numberElements = page.totalElements
      }
    })
  }
}
