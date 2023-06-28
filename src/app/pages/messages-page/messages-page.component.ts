import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleInfo, faInfo, faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO, MessageDTO } from 'src/app/services/api-service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit {
  writeIcon = faPenToSquare;
  infoIcon = faCircleInfo;

  conversations: ConversationDTO[] = [];
  selectedConversation?: ConversationDTO;

  messages: MessageDTO[] = [];


  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute) {
    this.chatService.conversations$.subscribe(conversations => {
      this.conversations = conversations;
      this.selectedConversation = this.conversations[0];
    });
  }
  ngOnInit(): void {

  }

}
