import { Component, OnInit } from '@angular/core';
import { PageProductBasicDTO, ProductBasicDTO, ProductControllerService } from "../../services/api-service";

@Component({
  selector: 'most-request-product',
  templateUrl: './most-request-product.component.html',
  styleUrls: ['./most-request-product.component.scss']
})
export class MostRequestProductComponent implements OnInit {

  productList: Array<ProductBasicDTO> = []

  constructor(private productService: ProductControllerService) {
  }

  ngOnInit(): void {
    console.log("ciao")

    this.productService.getFilteredProducts().subscribe({
      next: (value: PageProductBasicDTO) => {
        console.log(value)
        this.productList = value.content ?? []
      }
    })
  }


}
