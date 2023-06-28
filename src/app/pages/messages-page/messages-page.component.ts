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

  conversationId?: string;

  conversations: ConversationDTO[] = [];

  selectedConversation?: ConversationDTO;

  messages: MessageDTO[] = [];

  newMessageText: string = '';


  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      this.conversationId = params.get('conversation-id') ?? undefined;
      console.log("conversation-id: " + this.conversationId);

      if (this.conversationId)
        this.chatService.loadFullConversationMessages(this.conversationId);
    });


    this.chatService.conversations$.subscribe(conversations => {
      this.conversations = conversations;
      this.updateConversation();
    });


    this.chatService.OnUpdate$.subscribe(() => {
      this.updateConversation();
    });

  }


  private updateConversation() {
    if (!this.conversationId) {
      this.selectedConversation = undefined;
      this.messages = [];
      return;
    }

    this.selectedConversation = this.chatService.conversationsMap.get(this.conversationId);
    this.messages = this.chatService.messagesMap.get(this.conversationId) || [];
    this.chatService.refreshConversation(this.conversationId);
  }

  public sendMessage() {
    if (!this.selectedConversation || !this.newMessageText)
      return;
    this.chatService.sendMessageForConversation(this.newMessageText, this.selectedConversation).subscribe((message) => {
      this.messages.push(message);
    });

    this.newMessageText = '';
  }
}
