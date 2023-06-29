import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleInfo, faExclamationTriangle, faInfo, faInfoCircle, faPaperPlane, faPenToSquare, faRotateRight } from '@fortawesome/free-solid-svg-icons';
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
  faRefresh = faRotateRight;
  faPaperPlane = faPaperPlane;


  conversationId?: string;

  conversations: ConversationDTO[] = [];
  filteredConversations: ConversationDTO[] = [];

  selectedConversation?: ConversationDTO;

  messages: MessageDTO[] = [];

  newMessageText: string = '';
  conversationSearch: string = '';

  isRefreshingConversation: boolean = false;
  isRefreshingConversations: boolean = false;



  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      this.conversationId = params.get('conversation-id') ?? undefined;

      if (this.conversationId) {
        this.chatService.loadFullConversationMessages(this.conversationId);
        this.chatService.readMessagesOfConversation(this.conversationId).subscribe();

        this.updateConversation();
      }
    });


    this.chatService.conversations$.subscribe(conversations => {
      this.isRefreshingConversations = false;
      this.conversations = conversations;
      this.updateConversation();
    });


    this.chatService.OnUpdate$.subscribe(() => {
      this.isRefreshingConversation = false;
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
    this.chatService.refreshConversation(this.conversationId).subscribe();
    this.chatService.readMessagesOfConversation(this.conversationId).subscribe(() =>
      this.conversations = this.chatService.conversations$.getValue());
  }

  public sendMessage() {
    if (!this.selectedConversation || !this.newMessageText)
      return;

    console.log("sending message: ", this.newMessageText);


    this.chatService.sendMessageForConversation(this.newMessageText, this.selectedConversation).subscribe((message) => {
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


  refreshConversations() {
    this.chatService.getAllConversations();
    this.isRefreshingConversations = true;
  }

  reportConversation() {
    throw new Error('Method not implemented.');
  }

  refreshConversation() {
    this.chatService.refreshConversation(this.conversationId!).subscribe(() =>
      this.isRefreshingConversation = false);
    this.isRefreshingConversation = true;
  }

}
