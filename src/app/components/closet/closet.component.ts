import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterOptions } from 'src/app/models/filter-options';
import { PageProductBasicDTO, ProductControllerService, UserBasicDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent implements OnChanges {

  @Input() visitedUser: UserBasicDTO | null = null;

  customLoadMethod?: (page: number, pageSize: number) => Observable<PageProductBasicDTO>;

  get isCurrentUser() {
    return this.visitedUser?.id == this.currentUser.user?.id;
  }

  filter!: FilterOptions;
  isProductEmpty!: boolean;

  constructor(private currentUser: CurrentUserService, private productController: ProductControllerService) { }

  ngOnChanges(): void {
    this.filter = new FilterOptions();
    this.filter.userId = this.visitedUser?.id;

    if(this.isCurrentUser){
      this.customLoadMethod = this.productController.getMyProducts.bind(this.productController);
    }

    console.log(this.isProductEmpty);
  }

  setIsProductEmpty(isProductEmpty: boolean) {
    this.isProductEmpty = isProductEmpty;
  }



}
