import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard, faEnvelope, faGear, faHeart, faRightFromBracket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from 'src/app/models/product-category';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { ClothingDTO, UserDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';
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
  faSquarePlus = faSquarePlus;
  faGear = faGear;
  faAddressCard = faAddressCard;
  faRightFromBracket = faRightFromBracket;

  isCollapsed = true;
  isLoggedIn$ = this.apiAuth.isLoggedIn$;

  unreadMessages: number = 2;
  likedProductsCount: number = 4;

  currentUser: UserDTO | null = null;

  clothingCategory?: ProductCategory;
  homeCategory?: ProductCategory;
  entertainmentCategory?: ProductCategory;
  otherCategory?: ProductCategory;

  constructor(private UserLikesService: UserLikesService,
    public apiAuth: ApiAuthService,
    private categoriesService: ProductCategoriesService,
    private currentUserService: CurrentUserService,
    private route: Router
    ) { }

  ngOnInit(): void {

    this.UserLikesService.LikedProductsCount$.subscribe((count) => {
      this.likedProductsCount = count;
    });

    this.currentUserService.user$.subscribe((user) => {
      this.currentUser = user;
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
