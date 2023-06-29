import { Component, Input } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO } from 'src/app/services/api-service';

@Component({
  selector: 'conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss']
})
export class ConversationPreviewComponent {
  faCheck = faCheck;

  @Input() selected: boolean = false;
  @Input() conversation!: ConversationDTO;

  get otherUser() { return this.conversation.otherUser;}


  constructor() {


  }



}
