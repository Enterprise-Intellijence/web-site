import { Component } from '@angular/core';
import { PageProductBasicDTO, ProductBasicDTO, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent {

  user: UserDTO | null = null;
  productList: Array<ProductBasicDTO> = []; 
  page: number = 1;
  pageSize: number = 10;

  constructor(private currentUserService: CurrentUserService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(user => {
      this.user = user;
      this.loadProducts();
    })
  }

  loadProducts() {
    this.productService.getFilteredProducts({
      userId: this.user?.id,
      page: this.page,
      sizePage: this.pageSize
    }).subscribe(page => {
      this.productList = page.content!;
    });
  }
}
