import {Component, OnInit} from '@angular/core';
import {ProductControllerService, ProductDTO} from "../../services/api-service";

@Component({
  selector: 'most-request-product',
  templateUrl: './most-request-product.component.html',
  styleUrls: ['./most-request-product.component.scss']
})
export class MostRequestProductComponent  implements OnInit{

  productList!: Array<ProductDTO>

  constructor(private productService: ProductControllerService) {
  }

  ngOnInit(): void {
    console.log("ciao")
    this.productList = new Array<ProductDTO>()
    this.productService.getFilteredProducts().subscribe({
      next:(value: any)=>{
        this.productList = value
        console.log(this.productList)

      }
    })
  }


}
