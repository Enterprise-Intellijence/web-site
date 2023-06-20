import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductControllerService } from 'src/app/services/api-service';

@Component({
  selector: 'new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnInit {

  imagesLoaded: Array<File> = new Array<File>();
  filesLoaded: Array<File> = new Array<File>();
  primaryCategories: Array<ProductCategory> = new Array<ProductCategory>();
  secondaryCategories: Array<ProductCategory> = new Array<ProductCategory>();
  tertiaryCategories: Array<ProductCategory> = new Array<ProductCategory>();

  selectedCategory?: string;
  selectedSecondaryCategory?: string;
  selectedTertiaryCategory?: string;
  title?: string;
  description?: string;
  price?: string;



  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.filesLoaded.push(file);
      this.imagesLoaded.push(event.target.result);
      console.log("file: ", file);
      console.log("img: ", event.target.result);
    });

    reader.readAsDataURL(file);
  }

  onCategorySelected(i: number) {
    console.log("selected cat: ", i);
    this.secondaryCategories = this.primaryCategories[i].childCategories;
  }

  onSecondaryCategorySelected(i: number) {
    console.log("selected cat: ", i);
    this.tertiaryCategories = this.secondaryCategories[i].childCategories;
  }

  uploadProduct() {
    console.log("product uploaded");
  }

  ngOnInit(): void {
    this.categoriesService.onCategoriesLoaded.subscribe(() => {
      this.primaryCategories = this.categoriesService.primaryCategories;
    });
  }

  constructor(
    private categoriesService: ProductCategoriesService,
    private productService: ProductControllerService) {
  }
  
}
