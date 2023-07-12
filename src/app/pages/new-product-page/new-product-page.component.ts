import { Component, OnInit } from '@angular/core';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductCategory } from 'src/app/models/product-category';
import { EntertainmentCreateDTO, HomeCreateDTO, ProductControllerService, ProductDTO } from 'src/app/services/api-service';
import { ProductCreateDTO } from 'src/app/services/api-service';
import { SizeDTO } from 'src/app/services/api-service';
import { CustomMoneyDTO } from 'src/app/services/api-service';
import { ProductSizesService } from 'src/app/services/product-sizes.service';
import { ClothingCreateDTO } from 'src/app/services/api-service';
import { UploadImagesService } from 'src/app/services/upload-images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnInit {

  imagesLoaded = new Array<string>();
  filesLoaded = new Array<File>();

  primaryCategories = new Array<ProductCategory>();
  secondaryCategories = new Array<ProductCategory>();
  tertiaryCategories = new Array<ProductCategory>();
  deliverySizesMapping = new Map<string, ProductCreateDTO.ProductSizeEnum>();
  conditionsMapping = new Map<string, ProductCreateDTO.ConditionEnum>();
  visibilitiesMapping = new Map<string, ProductCreateDTO.VisibilityEnum>();

  allProductSizes: SizeDTO[] = [];
  sizesForSelectedCategory: SizeDTO[] = [];

  conditions = Object.values(ProductCreateDTO.ConditionEnum);
  visibilities = Object.values(ProductCreateDTO.VisibilityEnum);
  deliverySizes = Object.values(ProductCreateDTO.ProductSizeEnum);
  currencies = Object.values(CustomMoneyDTO.CurrencyEnum);
  genders = Object.values(ClothingCreateDTO.ProductGenderEnum);
  colours = Object.values(ClothingCreateDTO.ColourEnum);
  languages = Object.values(EntertainmentCreateDTO.EntertainmentLanguageEnum);
  materials = Object.values(HomeCreateDTO.HomeMaterialEnum);


  selectedPrimaryCategory?: ProductCategory;
  selectedSecondaryCategory?: ProductCategory;
  selectedTertiaryCategory?: ProductCategory;
  title: string = '';
  description: string = '';
  price: number = 0;
  currency: CustomMoneyDTO.CurrencyEnum = CustomMoneyDTO.CurrencyEnum.EUR;
  deliveryPrice: number = 0;
  deliverySize = ProductCreateDTO.ProductSizeEnum.MEDIUM;
  condition: ProductCreateDTO.ConditionEnum = ProductCreateDTO.ConditionEnum.NEWWITHOUTTAG;
  visibility: ProductCreateDTO.VisibilityEnum = ProductCreateDTO.VisibilityEnum.PUBLIC;
  brand: string = '';
  gender?: ClothingCreateDTO.ProductGenderEnum;
  size?: SizeDTO;
  clothingColour?: ClothingCreateDTO.ColourEnum;
  language?: EntertainmentCreateDTO.EntertainmentLanguageEnum;
  material?: HomeCreateDTO.HomeMaterialEnum;
  homeColour?: HomeCreateDTO.ColourEnum;
  idTertiaryCategory: string | null = null;
  product!: any;


  processFile(imageInput: any) {
    if (this.imagesLoaded.length === 5) {
      alert("Error on photos uploading: you can upload up to 5 photos");
      return;
    }
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.filesLoaded.push(file);
      this.imagesLoaded.push(event.target.result);
      console.log("event.target: ", event.target.result);

    });

    reader.readAsDataURL(file);
  }

  onPrimaryCategorySelected(category: ProductCategory) {
    this.selectedPrimaryCategory = category;
    this.secondaryCategories = category.childCategories;
    this.selectedSecondaryCategory = undefined;
    this.selectedTertiaryCategory = undefined;
    this.sizesForSelectedCategory = this.productSizesService.getSizesForCategory(this.selectedPrimaryCategory);

    if (category.childCategories.length == 1)
      this.onSecondaryCategorySelected(category.childCategories[0]);
  }

  onSecondaryCategorySelected(category: ProductCategory) {
    this.selectedSecondaryCategory = category;
    this.tertiaryCategories = category.childCategories;
    this.selectedTertiaryCategory = undefined;

    this.sizesForSelectedCategory = this.productSizesService.getSizesForCategory(this.selectedSecondaryCategory);

    if (category.childCategories.length == 1)
      this.onTertiaryCategorySelected(category.childCategories[0]);
  }

  onTertiaryCategorySelected(category: ProductCategory) {
    console.log("selected cat: ", category);
    this.selectedTertiaryCategory = category;
    this.sizesForSelectedCategory = this.productSizesService.getSizesForCategory(this.selectedTertiaryCategory);
    this.idTertiaryCategory = category.id;
  }

  onSizeSelected(size: SizeDTO) {
    this.size = size;
  }

  deleteImage(i: number) {
    this.imagesLoaded = this.imagesLoaded.splice(i, 1);
    this.filesLoaded = this.filesLoaded.splice(i, 1);
  }

  uploadProduct() {
    if (!this.title || !this.price || !this.currency || !this.deliveryPrice || this.imagesLoaded.length == 0
      || !this.brand || !this.selectedPrimaryCategory || !this.selectedSecondaryCategory || !this.selectedTertiaryCategory
      || !this.condition || !this.visibility) {
      alert("Please fill all the fields");
      return;
    }


    let newProduct: ProductCreateDTO = this.createProductDTO();

    console.log("id: ", this.idTertiaryCategory);
    console.log("type: ", newProduct.type);

    if (this.selectedPrimaryCategory.rawName === "Clothing") {
      if (!this.gender || !this.size || !this.clothingColour) {
        alert("Please fill all the fields.");
        console.log("gender: ", this.gender, " size: ", this.size, " color: ", this.clothingColour);
        return;
      }

      let newClothingProduct: ClothingCreateDTO = {
        ...newProduct,
        clothingSize: this.size,
        colour: this.clothingColour,
        productGender: this.gender
      };

      this.product = newClothingProduct;
    }

    else if (this.selectedPrimaryCategory.rawName === "Entertainment") {
      if (!this.language) {
        alert("Please fill all the fields");
        return;
      }

      let newEntertainmentProd: EntertainmentCreateDTO = {
        ...newProduct,
        entertainmentLanguage: this.language
      };

      this.product = newEntertainmentProd;
    }

    else if (this.selectedPrimaryCategory.rawName === "Home") {
      if (!this.material || !this.size || !this.homeColour) {
        alert("Compilare tutti i campi.");
        console.log("material: ", this.material, " size: ", this.size, " colour: ", this.homeColour);
        return;
      }

      let newHomeProduct: HomeCreateDTO = {
        ...newProduct,
        colour: this.homeColour,
        homeSize: this.size,
        homeMaterial: this.material
      };

      this.product = newHomeProduct;
    }

    else if (this.selectedPrimaryCategory.rawName === "Other") {
      this.product = newProduct;
    }

    console.log("product: ", this.product);
    this.productService.createProduct(this.product).subscribe(p => {
      console.log("upload completed!");
      console.log("response: ", p);
      // upload images

      this.filesLoaded.forEach(f => {
        this.imageService.saveProductImage(f, p.id!, p.description!).subscribe(res => {
          console.log("res", res);
        });
      });
      this.router.navigate(['/product', p.id]);
    });
  }


  createProductDTO(): ProductCreateDTO {
    return {
      title: this.title,
      description: this.description,
      productCost: { price: this.price, currency: this.currency },
      deliveryCost: { price: this.deliveryPrice, currency: this.currency },
      brand: this.brand,
      condition: this.condition,
      visibility: this.visibility,
      productCategory: {
        id: this.idTertiaryCategory!,
        primaryCat: this.selectedPrimaryCategory!.rawName,
        secondaryCat: this.selectedSecondaryCategory!.rawName,
        tertiaryCat: this.selectedTertiaryCategory!.rawName
      },
      productSize: this.deliverySize,
      // productImages: this.filesLoaded,
      type: this.selectedPrimaryCategory!.rawName
    };
  }



  ngOnInit(): void {
    this.categoriesService.onCategoriesLoaded.subscribe(() => {
      if (this.categoriesService.areCategoriesLoaded)
        this.primaryCategories = this.categoriesService.primaryCategories;
    });

    var cond = Object.values(ProductCreateDTO.ConditionEnum);
    console.log("c", cond);

    for (let i = 0; i < this.conditions.length; i++) {
      this.conditionsMapping.set(this.conditions[i], cond[i]);
    }

    var vis = Object.values(ProductCreateDTO.VisibilityEnum);
    for (let i = 0; i < this.visibilities.length; i++) {
      this.visibilitiesMapping.set(this.visibilities[i], vis[i]);
    }

    var deliveryS = Object.values(ProductCreateDTO.ProductSizeEnum);
    for (let i = 0; i < this.visibilities.length; i++) {
      this.deliverySizesMapping.set(this.deliverySizes[i], deliveryS[i]);
    }

    this.productSizesService.onSizesLoaded.subscribe((sizes) => {
      if (this.productSizesService.areSizesLoaded) {
        this.allProductSizes = sizes;
      }
    });
  }

  constructor(
    private categoriesService: ProductCategoriesService,
    private productService: ProductControllerService,
    private productSizesService: ProductSizesService,
    private imageService: UploadImagesService,
    private router: Router) {
  }

}
