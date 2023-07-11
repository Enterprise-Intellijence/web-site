import {Component, Input, OnInit} from '@angular/core';
import {AdminControllerService, PageProductBasicDTO, ProductDTO} from "../../../services/api-service";
import {CurrentUserService} from "../../../services/current-user.service";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  @Input()product?: ProductDTO


  productId!: string;

  constructor(private  adminService:AdminControllerService, public currentUser: CurrentUserService) {
  }

  ngOnInit(): void {

  }



  handleClick() {
    this.adminService.getProduct(this.productId).subscribe({
      next:(value: ProductDTO)=>{
        this.product = value
      }
    })

  }
}
