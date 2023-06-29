import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleInfo, faExclamationTriangle, faInfo, faInfoCircle, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO, MessageDTO } from 'src/app/services/api-service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit {

  writeIcon = faPenToSquare;
  infoIcon = faCircleInfo;
  faExclamationTriangle = faExclamationTriangle;


  conversationId?: string;

  conversations: ConversationDTO[] = [];
  filteredConversations: ConversationDTO[] = [];

  selectedConversation?: ConversationDTO;

  messages: MessageDTO[] = [];

  newMessageText: string = '';
  conversationSearch: string = '';


  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      this.conversationId = params.get('conversation-id') ?? undefined;

      if (this.conversationId) {
        this.chatService.loadFullConversationMessages(this.conversationId);
        this.chatService.readMessagesOfConversation(this.conversationId);

        this.updateConversation();
      }
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
    this.chatService.readMessagesOfConversation(this.conversationId);
  }

  public sendMessage() {
    if (!this.selectedConversation || !this.newMessageText)
      return;
    this.chatService.sendMessageForConversation(this.newMessageText, this.selectedConversation).subscribe((message) => {
      this.messages.unshift(message);
      this.chatService.getAllConversations();
    });

    this.newMessageText = '';
  }

  conversationSearchChanged($event: string) {
    this.conversationSearch = $event;
    this.filteredConversations = this.conversations.filter(c => {
      return c.otherUser.username.toLowerCase().includes(this.conversationSearch.toLowerCase()) ||
        c.lastMessage.text.toLowerCase().includes(this.conversationSearch.toLowerCase());
    }
    );
  }

}
