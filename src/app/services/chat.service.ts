import { Injectable } from '@angular/core';
import { ApiAuthService } from './api-auth.service';
import { ConversationDTO, CustomMoneyDTO, MessageControllerService, MessageCreateDTO, MessageDTO, OfferControllerService, OfferCreateDTO, OfferDTO, ProductBasicDTO, UserBasicDTO } from './api-service';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  conversationsMap = new Map<string, ConversationDTO>();
  conversations: ConversationDTO[] = [];
  conversations$ = new BehaviorSubject<ConversationDTO[]>([]);


  /**
   * Map of conversation ids to messages
   */
  messagesMap = new Map<string, MessageDTO[]>();


  OnUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor(private apiAuth: ApiAuthService,
    private offerService: OfferControllerService,
    private messageService: MessageControllerService,
    private currentUserService: CurrentUserService) {
    apiAuth.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn)
        this.getAllConversations();
    });

    //repeat every 10 seconds
    // setInterval(() => {
    //   this.getAllConversations();
    // }, 10000);
  }


  getAllConversations() {
    this.messageService.getAllMyConversations().subscribe(conversations => {
      this.conversations = conversations;

      this.conversations.forEach(conversation => {
        let messages = this.messagesMap.get(conversation.conversationId!) || [];
        this.messagesMap.set(conversation.conversationId!, messages);
        this.conversationsMap.set(conversation.conversationId!, conversation);
      });

      this.conversations = this.conversations.sort((a, b) => {
        let aDate = new Date(a.lastMessage.messageDate!).getTime();
        let bDate = new Date(b.lastMessage.messageDate!).getTime();
        return bDate > aDate ? 1 : -1;
      });

      this.conversations$.next(this.conversations);
      this.OnUpdate$.next(true);
    });
  }


  loadConversationPageMessages(conversationId: string, page: number = 0, size: number = 40) {
    this.messageService.getConversation(conversationId, page, size).subscribe(messages => {
      if (page == 0) {
        this.messagesMap.set(conversationId, messages.content!);

        let conversation = this.conversationsMap.get(conversationId);
        if (conversation != null)
          conversation.lastMessage = messages.content![0];
      }
      else {
        let chatMessages = this.messagesMap.get(conversationId) || [];
        this.messagesMap.set(conversationId, [...chatMessages, ...messages.content!]);
      }
      this.OnUpdate$.next(true);
    });

  }

  public loadFullConversationMessages(conversationId: string) {
    this.loadConversationPageMessages(conversationId, 0, 5000);
  }



  public refreshConversation(conversationId: string) {
    this.messageService.getConversation(conversationId, 0, 40).subscribe(messages => {
      let chatMessages = this.messagesMap.get(conversationId) || [];
      if (chatMessages.length == 0) {
        this.messagesMap.set(conversationId, messages.content!);
        this.OnUpdate$.next(true);
      }
      else {
        // check which messages are new
        let newMessages = messages.content!.filter(message => !chatMessages.some(chatMessage => chatMessage.id == message.id));

        if (newMessages.length > 0) {

          if (newMessages.length == messages.content!.length) {
            // TODO: all messages are new, there might be more we haven't loaded yet
          }
          this.messagesMap.set(conversationId, [...newMessages, ...chatMessages]);

          let conversation = this.conversationsMap.get(conversationId);
          if (conversation != null)
            conversation.lastMessage = messages.content![0];

          this.OnUpdate$.next(true);
        }
      }
    });
  }

  public sendMessageForConversationId(message: string, conversationId: string): Observable<MessageDTO> {
    let conversation = this.getConversation(conversationId);

    if (conversation == null)
      return throwError(() => new Error("Conversation not found"));
    else
      return this.sendMessageForConversation(message, conversation);

  }

  public sendMessageForConversation(message: string, conversation: ConversationDTO): Observable<MessageDTO> {

    let prod: any = conversation.productBasicDTO;
    if(conversation.productBasicDTO != null) {
      prod.productImages = [conversation.productBasicDTO.productImages]
    }

    let messageCreateDTO: MessageCreateDTO = {
      text: message,
      receivedUser: conversation.otherUser,
      product: prod,
      conversationId: conversation.conversationId
    };

    return this.messageService.createMessage(messageCreateDTO).pipe(
      tap(message => {
        let messages = this.messagesMap.get(conversation.conversationId!) || [];
        this.messagesMap.set(conversation.conversationId!, [message, ...messages]);
        this.conversationsMap.get(conversation.conversationId!)!.lastMessage = message;
        this.OnUpdate$.next(true);
      })
    )
  }


  public readMessagesOfConversation(conversationId: string) {
    let myId = this.currentUserService.user?.id;
    let messagesIds = this.messagesMap.get(conversationId)?.filter(message => message.messageStatus == 'UNREAD' && message.receivedUser.id == myId).map(message => message.id!) || [];
    this.messageService.setReadMessages(messagesIds).subscribe();
  }

  public sendFirstMessage(message: string, to: UserBasicDTO, product?: ProductBasicDTO): Observable<MessageDTO> {
    let messageCreateDTO: MessageCreateDTO = {
      text: message,
      receivedUser: to,
      product: product
    };

    return this.messageService.createMessage(messageCreateDTO);
  }


  public sendOfferMessage(product: ProductBasicDTO, amount: CustomMoneyDTO): Observable<OfferDTO> {
    let offer: OfferCreateDTO = {
      product: product,
      amount: amount,
    }
    return this.offerService.createOffer(offer);
  }


  public getConversation(conversationId: string): ConversationDTO | null {
    return this.conversationsMap.get(conversationId) || null;
  }

  public getConversationWithUser(otherUser: UserBasicDTO, product?: ProductBasicDTO): ConversationDTO | null {
    // we can use new endpoint for this if we want
    return this.conversations.find(conversation =>
      conversation.otherUser.id == otherUser.id &&
      (conversation.productBasicDTO == product)) || null;
  }



}
