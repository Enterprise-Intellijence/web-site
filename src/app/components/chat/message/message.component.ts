import { Component, Input } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO, MessageDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  faCheck = faCheck;

  @Input() message!: MessageDTO;
  @Input() conversation!: ConversationDTO;


  get otherUser() { return this.conversation.otherUser; }
  get myself() { return this.currentUserService.user; }
  get isRead() { return this.message.messageStatus == 'READ'; }
  get isOffer() { return this.message.offer != null; }

  constructor(private currentUserService: CurrentUserService) { }

  public get isOwnMessage() { return (this.message.sendUser.id === this.myself?.id) ?? true; }



}
