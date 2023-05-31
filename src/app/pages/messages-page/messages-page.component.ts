import { Component } from '@angular/core';
import { faCircleInfo, faInfo, faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent {
  writeIcon = faPenToSquare;
  infoIcon = faCircleInfo;
  // conversations: Conversation[] = [];

}
