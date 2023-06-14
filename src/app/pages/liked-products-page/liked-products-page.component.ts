import { Component } from '@angular/core';
import { ProductBasicDTO } from 'src/app/services/api-service';

@Component({
  selector: 'liked-products-page',
  templateUrl: './liked-products-page.component.html',
  styleUrls: ['./liked-products-page.component.scss']
})
export class LikedProductsPageComponent {

  productList!: Array<ProductBasicDTO>;

  ngOnInit(): void {
    this.productList = new Array<ProductBasicDTO>();
    /*this.productService.allProduct().subscribe({
      next:(value: any)=>{
        this.productList = value
      }
    });*/
  }
}
