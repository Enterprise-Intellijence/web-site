import { Component, OnInit } from '@angular/core';
import { ProductControllerService } from 'src/app/services/api-service';
import { ProductDTO } from 'src/app/services/api-service/model/productDTO';

@Component({
  selector: 'liked-products-page',
  templateUrl: './liked-products-page.component.html',
  styleUrls: ['./liked-products-page.component.scss']
})
export class LikedProductsPageComponent implements OnInit {
  
  productList!: Array<ProductDTO>;

  ngOnInit(): void {
    this.productList = new Array<ProductDTO>();
    this.productService.allProduct().subscribe({
      next:(value: any)=>{
        this.productList = value
      }
    });
  }

  constructor(private productService: ProductControllerService) {

  }
}
