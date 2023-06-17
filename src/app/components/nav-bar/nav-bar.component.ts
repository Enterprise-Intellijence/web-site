import { Component, OnInit } from '@angular/core';
import { faEnvelope, faHeart, faRightFromBracket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from 'src/app/models/product-category';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { UserLikesService } from 'src/app/services/user-likes.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  searchIcon = faSearch;
  loginIcon = faRightFromBracket;
  messagesIcon = faEnvelope;
  likesIcon = faHeart;
  userIcon = faUser;

  isCollapsed = true;
  isLoggedIn = false;

  unreadMessages: number = 2;
  likedProductsCount: number = 4;

  clothingCategory?: ProductCategory;
  homeCategory?: ProductCategory;
  entertainmentCategory?: ProductCategory;
  otherCategory?: ProductCategory;

  constructor(private UserLikesService: UserLikesService,
    private apiAuth: ApiAuthService,
    private categoriesService: ProductCategoriesService) { }

  ngOnInit(): void {
    this.apiAuth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.UserLikesService.LikedProductsCount$.subscribe((count) => {
      this.likedProductsCount = count;
    });

    this.categoriesService.onCategoriesLoaded.subscribe(() => {
      this.clothingCategory = this.categoriesService.getCategoryByRawName('Clothing') ?? undefined;
      this.homeCategory = this.categoriesService.getCategoryByRawName('Home') ?? undefined;
      this.entertainmentCategory = this.categoriesService.getCategoryByRawName('Entertainment') ?? undefined;
      this.otherCategory = this.categoriesService.getCategoryByRawName('Other') ?? undefined;
    });
  }

  public logout() {
    this.apiAuth.logout();
  }





}
