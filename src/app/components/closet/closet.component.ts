import { Component } from '@angular/core';
import { PageProductBasicDTO, ProductBasicDTO, ProductControllerService, UserBasicDTO, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent {
  
  user: UserDTO | null = null;
  productPage: Array<ProductBasicDTO> | undefined = []
  page: number = 0;
  pageSize: number = 10;

  constructor(private currentUserService: CurrentUserService,
              private productService: ProductControllerService) { }

  ngOnInit(): void {
    this.currentUserService.user$.subscribe(
      (user: UserDTO | null) => {
        this.user = user;
        this.loadProducts();
    });

    
  }

  loadProducts() {
    this.productService.getFilteredProducts().subscribe({
      next: (value: PageProductBasicDTO) => {
        this.productPage = value.content ?? []
      }
    })
  }
}
