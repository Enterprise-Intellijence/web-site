import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEnvelope, faHeart, faRightFromBracket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from 'src/app/models/product-category';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { ClothingDTO } from 'src/app/services/api-service';
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
    private categoriesService: ProductCategoriesService,
    // to redirect to the search page
    private route: Router
    ) { }

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


  searchFor($event: ProductCategory, gender?: ClothingDTO.ProductGenderEnum) {
    //console.log("searching for:", $event.name, "for gender: ", gender);
    let child : String | undefined;
    let secondary : String | undefined;
    let primary : String | undefined;
    const categoryPath = $event.getCategoryPath()

    if(categoryPath.length>2) {
      child = categoryPath[categoryPath.length - 1].rawName;
      secondary = categoryPath[categoryPath.length - 2].rawName;
      primary = categoryPath[categoryPath.length - 3].rawName;
    }
    else if(categoryPath.length>1){
      secondary = categoryPath[categoryPath.length - 1].rawName;
      primary = categoryPath[categoryPath.length - 2].rawName;
    }
    else
      primary = categoryPath[categoryPath.length - 1].rawName;


    this.route.navigate(['/search-page'], {
      queryParams: {
        primary: primary,
        secondary: secondary,
        child: child,
        gender:gender
      }
    });
  }

}
