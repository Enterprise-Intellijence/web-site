import { Component } from '@angular/core';
import { ProductBasicDTO } from 'src/app/services/api-service';

@Component({
  selector: 'new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent {

  imagesLoaded: Array<String> = new Array<String>();
  title: string = "";
  description: string = "";
  price: string = "";
  categoryList;
  selectedCategory = "";

  constructor() {
    this.categoryList = Object.keys(ProductBasicDTO.ProductCategoryEnum);
    console.log("size: " + this.imagesLoaded.length);
  }
}
