import { Component } from '@angular/core';
import { faCircleInfo, faInfo, faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO, MessageDTO } from 'src/app/services/api-service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent {
  writeIcon = faPenToSquare;
  infoIcon = faCircleInfo;

  conversations: ConversationDTO[] = [];
  selectedConversation?: ConversationDTO;

  messages: MessageDTO[] = [];


  constructor(private chatService: ChatService) {
    this.chatService.conversations$.subscribe(conversations => {
      this.conversations = conversations;
    });
  }

}
