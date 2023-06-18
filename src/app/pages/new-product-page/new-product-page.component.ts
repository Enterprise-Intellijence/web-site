import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductDTO } from 'src/app/services/api-service';

@Component({
  selector: 'new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent {

  imagesLoaded: Array<SafeUrl> = new Array<SafeUrl>();
  title: string = "";
  description: string = "";
  price: string = "";
  selectedCategory = "";
  selectedParentCategory = "";
  selectedChildCategory = "";

  printSizeImgs() {
    console.log("S: " + this.imagesLoaded.length);
  }

  onFileSelected(event: any) {
    if(event.target.files) {
        this.imagesLoaded.push(this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0])));
    }
  }

  constructor(private sanitizer: DomSanitizer) {
    this.categoryList = Object.keys(ProductDTO.ProductCategoryEnum);
  }
}
