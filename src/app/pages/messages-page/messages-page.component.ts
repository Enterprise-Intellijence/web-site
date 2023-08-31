import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleInfo, faExclamationTriangle, faPaperPlane, faPenToSquare, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO, MessageDTO, ProductBasicDTO, ProductControllerService, ReportControllerService, ReportDTO, UserBasicDTO, UserControllerService } from 'src/app/services/api-service';
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

  makingNewConversation: boolean = false;

  selectedConversationUserID?: string;
  selectedConversationUser?: UserBasicDTO;

  selectedConversationProductID?: string;
  selectedConversationProduct?: ProductBasicDTO;


  messages: MessageDTO[] = [];

  newMessageText: string = '';
  conversationSearch: string = '';

  isRefreshingConversation: boolean = false;
  isRefreshingConversations: boolean = false;
  reportMessage: string = '';



  constructor(private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserControllerService,
    private productService: ProductControllerService,
    private reportService: ReportControllerService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.makingNewConversation = url.at(1)?.path == 'new' ?? false;
      this.UpdateConversationIfExists();
    });


    this.activatedRoute.paramMap.subscribe(params => {

      this.conversationId = params.get('conversation-id') ?? undefined;
      this.selectedConversationUserID = params.get('user-id') ?? undefined;

      if (this.selectedConversationUserID) {
        this.userService.userById(this.selectedConversationUserID).subscribe(user => {
          this.selectedConversationUser = user;
          this.UpdateConversationIfExists();
        });
      }

      if (this.conversationId) {
        this.chatService.loadFullConversationMessages(this.conversationId);
        this.chatService.readMessagesOfConversation(this.conversationId).subscribe();

        this.updateConversation();
      }
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (!this.makingNewConversation) {
        return;
      }

      this.selectedConversationProductID = params['product-id'] ?? undefined;
      if (this.selectedConversationProductID) {
        this.productService.productBasicById(this.selectedConversationProductID).subscribe(product => {
          this.selectedConversationProduct = product;
        });
      }

    });


    this.chatService.conversations$.subscribe(conversations => {
      this.isRefreshingConversations = false;
      this.conversations = conversations;
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
      if (!this.makingNewConversation) {
        this.selectedConversationUserID = undefined;
        this.selectedConversationUser = undefined;

        this.selectedConversationProductID = undefined;
        this.selectedConversationProduct = undefined;
      }
      return;
    }

    this.selectedConversation = this.chatService.conversationsMap.get(this.conversationId);

    this.selectedConversationUserID = this.selectedConversation?.otherUser.id;
    this.selectedConversationUser = this.selectedConversation?.otherUser;

    this.selectedConversationProductID = this.selectedConversation?.productBasicDTO?.id;
    this.selectedConversationProduct = this.selectedConversation?.productBasicDTO;

    this.messages = this.chatService.messagesMap.get(this.conversationId) || [];

    this.refreshConversation();
    this.chatService.readMessagesOfConversation(this.conversationId).subscribe(() => {
      this.conversations = this.chatService.conversations$.getValue();
    });
  }

  public sendMessage() {
    if (this.newMessageText == '')
      return;

    if (this.makingNewConversation) {
      if (!this.selectedConversationUser) {
        return;
      }

      this.chatService.sendFirstMessage(this.newMessageText, this.selectedConversationUser!, this.selectedConversationProduct).subscribe((message) => {
        this.chatService.getAllConversations();
        this.UpdateConversationIfExists();
      });
    } else {
      if (!this.selectedConversation) {
        return;
      }

      this.chatService.sendMessageForConversation(this.newMessageText, this.selectedConversation).subscribe((message) => {
        this.chatService.getAllConversations();
      });
    }

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

  reportConversation() {}

  refreshConversation() {
    this.isRefreshingConversation = true;
    this.chatService.refreshConversation(this.conversationId!).subscribe(() => {
      this.isRefreshingConversation = false;
    });
  }

  UpdateConversationIfExists(): void {
    if (!this.makingNewConversation)
      return;

    if (!this.selectedConversationUser)
      return;

    console.log("UpdateConversationIfExists for user: " + this.selectedConversationUser.username + " and product: " + this.selectedConversationProductID ?? "undefined");


    this.chatService.getConversationWithUser(this.selectedConversationUser.id!, this.selectedConversationProductID).subscribe(
      conversation => {
        if (conversation) {
          console.log("Conversation exists, redirecting to it");
          this.selectedConversation = conversation;
          this.router.navigate(['/messages', conversation.conversationId], { replaceUrl: true });
        }
        else{
          console.log("Conversation does not exist");
        }
      }
    );
  }

}
