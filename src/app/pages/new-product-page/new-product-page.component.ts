import { Component, OnInit } from '@angular/core';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductControllerService, ProductCreateDTO } from 'src/app/services/api-service';
import { CustomMoneyDTO } from 'src/app/services/api-service';
@Component({
  selector: 'new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnInit {

  imagesLoaded: Array<string> = new Array<string>();
  filesLoaded: Array<File> = new Array<File>();

  primaryCategories: Array<ProductCategory> = new Array<ProductCategory>();
  secondaryCategories: Array<ProductCategory> = new Array<ProductCategory>();
  tertiaryCategories: Array<ProductCategory> = new Array<ProductCategory>();
  conditionsMapping: Map<string, string> = new Map<string, string>();
  visibilitiesMapping: Map<string, string> = new Map<string, string>();
  conditions = ["Nuovo con etichetta", "Nuovo senza etichetta", "Come nuovo", "Buone condizioni", "Acettabile"];
  visibilities = ["Pubblico", "Privato"];
  currencies: string[] = [];
  product!: ProductCreateDTO;

  selectedCategory?: string;
  selectedSecondaryCategory?: string;
  selectedTertiaryCategory?: string;
  title?: string;
  description?: string;
  price?: string;
  currency?: string;
  deliveryPrice?: string;
  condition?: string;
  visibility?: string;


  processFile(imageInput: any) {
    if(this.imagesLoaded.length === 5) {
      alert("Impossibile caricare altre immagini: numero massimo di file da caricare raggiunto.");
      return;
    }
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.filesLoaded.push(file);
      this.imagesLoaded.push(event.target.result);
    });

    reader.readAsDataURL(file);
  }

  onCategorySelected(i: number) {
    console.log("selected cat: ", i);
    this.secondaryCategories = this.primaryCategories[i].childCategories;
    this.selectedSecondaryCategory = "";
    this.selectedTertiaryCategory = "";
  }

  onSecondaryCategorySelected(i: number) {
    console.log("selected cat: ", i);
    this.tertiaryCategories = this.secondaryCategories[i].childCategories;
    this.selectedTertiaryCategory = "";

  }

  deleteImage(i: number) {
    this.imagesLoaded.splice(i,1);
    this.filesLoaded.splice(i,1);
  }

  uploadProduct() {
    if(!this.title || !this.description || !this.price || !this.deliveryPrice || this.imagesLoaded.length == 0) {
      alert("Compilare tutti i campi.");
    }
    else {
      this.product["title"] = this.title;
      this.product["description"] = this.description;
      this.product.productCost = {price: +this.price, currency: this.currency == "USD" ? 'USD': 'EUR'};
      this.product.deliveryCost = {price: +this.deliveryPrice, currency: this.currency == "USD" ? 'USD': 'EUR'};

      this.product.productImages = this.filesLoaded;
      console.log("product uploaded");
    }
  }

  ngOnInit(): void {
    var cond = Object.keys(ProductCreateDTO.ConditionEnum);
    for (let i = 0; i < this.conditions.length; i++) {
      this.conditionsMapping.set(this.conditions[i], cond[i]);
    }

    var vis = Object.keys(ProductCreateDTO.VisibilityEnum);
    for (let i = 0; i < this.visibilities.length; i++) {
      this.visibilitiesMapping.set(this.visibilities[i], vis[i]);
    }

    this.currencies = Object.keys(CustomMoneyDTO.CurrencyEnum);
    
    this.categoriesService.onCategoriesLoaded.subscribe(() => {
      this.primaryCategories = this.categoriesService.primaryCategories;
    });
  }

  constructor(
    private categoriesService: ProductCategoriesService,
    private productService: ProductControllerService) {
  }
  
}
