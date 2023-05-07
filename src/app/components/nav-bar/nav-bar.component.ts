import { Component } from '@angular/core';
import { faEnvelope, faHeart, faRightFromBracket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  search_icon = faSearch;
  loginIcon = faRightFromBracket;
  messages_icon = faEnvelope;
  likes_icon = faHeart;
  user_icon = faUser;

  isCollapsed = true;
  isLoggedIn = true;
}
