import { Component, OnInit } from '@angular/core';
import { faEnvelope, faHeart, faRightFromBracket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
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
  isLoggedIn = true;

  unreadMessages: number = 2;
  likedProductsCount: number = 4;

  constructor(private UserLikesService: UserLikesService) { }

  ngOnInit(): void {
    this.UserLikesService.LikedProductsCount$.subscribe((count) => {
      this.likedProductsCount = count;
    });
  }


}
