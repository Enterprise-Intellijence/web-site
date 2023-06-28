import { Component, Input } from '@angular/core';
import { ConversationDTO } from 'src/app/services/api-service';

@Component({
  selector: 'conversation-preview',
  templateUrl: './conversation-preview.component.html',
  styleUrls: ['./conversation-preview.component.scss']
})
export class ConversationPreviewComponent {

  @Input() conversation!: ConversationDTO;

  get otherUser() { return this.conversation.otherUser;}


  constructor() {


  }



}
