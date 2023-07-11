import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard, faEnvelope, faGavel, faGear, faHeart, faRightFromBracket, faSearch, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from 'src/app/models/product-category';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { ClothingDTO, UserDTO } from 'src/app/services/api-service';
import { ChatService } from 'src/app/services/chat.service';
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
  faTruck = faTruck;
  faGavel = faGavel;


  isCollapsed = true;
  isLoggedIn$ = this.apiAuth.isLoggedIn$;

  unreadMessages: number = 2;
  likedProductsCount: number = 4;

  currentUser: UserDTO | null = null;

  clothingCategory?: ProductCategory;
  homeCategory?: ProductCategory;
  entertainmentCategory?: ProductCategory;
  otherCategory?: ProductCategory;

  public searchQuery = '';

  constructor(private UserLikesService: UserLikesService,
    public apiAuth: ApiAuthService,
    private categoriesService: ProductCategoriesService,
    private currentUserService: CurrentUserService,
    private chatService: ChatService,
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

    this.chatService.undreadConversationsCount$.subscribe((count) => {
      this.unreadMessages = count;
    });
  }

  public logout() {
    this.apiAuth.logout();
  }


  searchForProductCategory($event: ProductCategory, gender?: ClothingDTO.ProductGenderEnum) {
    //console.log("searching for:", $event.name, "for gender: ", gender);

    this.route.navigate(['/search-page'], {
      queryParams: {
        category: $event.rawName,
        gender:gender
      }
    });
  }

  searchForQuery(query: string) {
    this.route.navigate(['/search-page'], {
      queryParams: {
        query: query
      },
      queryParamsHandling: 'merge'
    });
  }

}
