import {Component, OnInit} from '@angular/core';
import {ProductSizesService} from "../../../services/product-sizes.service";
import {SizeDTO, SuperAdminControllerService} from "../../../services/api-service";
import {ProductCategoriesService} from "../../../services/product-categories.service";
import {ProductCategory} from "../../../models/product-category";
import {Route, Router} from "@angular/router";



@Component({
  selector: 'add-new-size',
  templateUrl: './add-new-size.component.html',
  styleUrls: ['./add-new-size.component.scss']
})
export class AddNewSizeComponent implements OnInit{

  categoryChoice: Array<string> = ["Home"]
  selectedCategory: string = ""
  sizeName: string =""

  newSize?: SizeDTO | null

  constructor(private route: Router,private sizeService: ProductSizesService, private superAdminService: SuperAdminControllerService, private categoryService: ProductCategoriesService) {
  }

  ngOnInit(): void {
    /*this.categoryChoice.push() */
    var categories = this.categoryService.allCategories
    categories.forEach((category: ProductCategory)=>{
      if(category.parentCategory!=null && category.parentCategory.rawName=="Clothing")
        this.categoryChoice.push(category.rawName)
    })
  }

  addSize() {
    console.log(this.sizeName, this.selectedCategory)
    if(this.sizeName != "" && this.selectedCategory != ""){
      this.newSize = {sizeName: this.sizeName, type: this.selectedCategory}

      this.superAdminService.createNewSize(this.newSize!).subscribe({
        next:(value: any)=>{
          if(value.id != null)
            this.route.navigate(['/administration/manage-sizes'])
        }
      })
    }
  }

}
