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
  filesLoaded= new Array<File>();

  primaryCategories = new Array<ProductCategory>();
  secondaryCategories = new Array<ProductCategory>();
  tertiaryCategories = new Array<ProductCategory>();
  deliverySizesMapping = new Map<string, ProductCreateDTO.ProductSizeEnum>();
  conditionsMapping = new Map<string, ProductCreateDTO.ConditionEnum>();
  visibilitiesMapping = new Map<string, ProductCreateDTO.VisibilityEnum>();
  conditions = ["Nuovo con etichetta", "Nuovo senza etichetta", "Come nuovo", "Buone condizioni", "Acettabile"];
  visibilities = ["Pubblico", "Privato"];
  deliverySizes = ["Big", "Medium", "Small"];
  prodSizes: Array<SizeDTO> = new Array<SizeDTO>();
  categorySizes: SizeDTO[] = [];
  currencies: string[] = [];
  genders: string[] = [];
  colours: string[] = [];
  languages: string[] = [];
  materials: string[] = [];


  selectedCategory?: ProductCategory;
  selectedSecondaryCategory?: ProductCategory;
  selectedTertiaryCategory?: ProductCategory;
  title?: string;
  description?: string;
  price?: string;
  currency?: string;
  deliveryPrice?: string;
  deliverySize?: string;
  condition?: string;
  visibility?: string;
  brand?: string;
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

  onCategorySelected(i: number) {
    console.log("selected cat: ", i);
    this.selectedCategory = this.primaryCategories[i];
    this.secondaryCategories = this.selectedCategory.childCategories;
    this.selectedSecondaryCategory = undefined;
    this.selectedTertiaryCategory = undefined;
    this.categorySizes = this.productSizesService.getSizesForCategory(this.selectedCategory);
    console.log("cat size: ", this.categorySizes);
  }

  onSecondaryCategorySelected(i: number) {
    console.log("selected cat: ", i);
    this.selectedSecondaryCategory = this.secondaryCategories[i];
    this.tertiaryCategories = this.secondaryCategories[i].childCategories;
    this.selectedTertiaryCategory = undefined;
    this.categorySizes = this.productSizesService.getSizesForCategory(this.selectedSecondaryCategory);
    console.log("cat size2: ", this.categorySizes);
  }

  onTertiaryCategorySelected(i: number) {
    this.selectedTertiaryCategory = this.tertiaryCategories[i];
    this.categorySizes = this.productSizesService.getSizesForCategory(this.selectedTertiaryCategory);
    this.idTertiaryCategory = this.tertiaryCategories[i].id;
    console.log("cat size3: ", this.categorySizes);
  }

  onSizeSelected(size: SizeDTO) {
    this.size = size;
    console.log("size: ", size);

  }

  deleteImage(i: number) {
    this.imagesLoaded.splice(i, 1);
    this.filesLoaded.splice(i, 1);
  }

  uploadProduct() {
    if (!this.title || !this.description || !this.price || !this.currency || !this.deliveryPrice || this.imagesLoaded.length == 0
      || !this.brand || !this.selectedCategory || !this.selectedSecondaryCategory || !this.selectedTertiaryCategory
      || !this.condition || !this.visibility) {
      alert("Please fill all the fields");
      return;
    }

    let regex: RegExp = /^\d+$/;
    if(!regex.test(this.price) || !regex.test(this.deliveryPrice)) {
      alert("Error: price and delivery price must be numbers")
      return; 
    }

    let newProduct: ProductCreateDTO = this.createProductDTO();

    console.log("id: ", this.idTertiaryCategory);
    console.log("type: ", newProduct.type);

    if (this.selectedCategory.rawName === "Clothing") {
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

    else if (this.selectedCategory.rawName === "Entertainment") {
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

    else if (this.selectedCategory.rawName === "Home") {
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

    else if (this.selectedCategory.rawName === "Other") {
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
      title: this.title || "",
      description: this.description || "",
      productCost: { price: +this.price!, currency: this.currency == "USD" ? 'USD' : 'EUR' },
      deliveryCost: { price: +this.deliveryPrice!, currency: this.currency == "USD" ? 'USD' : 'EUR' },
      brand: this.brand,
      condition: this.conditionsMapping.get(this.condition!)!,
      visibility: this.visibilitiesMapping.get(this.visibility!)!,
      productCategory: {
        id: this.idTertiaryCategory!,
        primaryCat: this.selectedCategory!.rawName,
        secondaryCat: this.selectedSecondaryCategory!.rawName,
        tertiaryCat: this.selectedTertiaryCategory!.rawName
      },
      productSize: this.deliverySizesMapping.get(this.deliverySize!)!,
      // productImages: this.filesLoaded,
      type: this.selectedCategory!.rawName
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
    
    this.currencies = Object.keys(CustomMoneyDTO.CurrencyEnum);
    this.genders = Object.keys(ClothingCreateDTO.ProductGenderEnum);
    this.colours = Object.keys(ClothingCreateDTO.ColourEnum);
    this.languages = Object.values(EntertainmentCreateDTO.EntertainmentLanguageEnum);
    this.materials = Object.keys(HomeCreateDTO.HomeMaterialEnum);

    this.productSizesService.onSizesLoaded.subscribe((sizes) => {
      if (this.productSizesService.areSizesLoaded) {
        this.prodSizes = sizes;
        console.log("on sizes loaded: ", this.prodSizes);
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
