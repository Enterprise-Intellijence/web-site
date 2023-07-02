import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faCross, faHourglassHalf, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ConversationDTO, MessageDTO, OfferControllerService, OfferDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {


  faCheck = faCheck;
  faXMark = faXmark;
  faHourglassHalf = faHourglassHalf;



  offerStatusIcon: IconProp = this.faCheck;
  offerStatusText: string = 'Offer accepted';
  offerStatusClass: string = 'bg-success';


  @Input() message!: MessageDTO;
  @Input() conversation!: ConversationDTO;

  get product() { return this.message.product; }
  get offer() { return this.message.offer; }

  get otherUser() { return this.conversation.otherUser; }
  get myself() { return this.currentUserService.user; }
  get isRead() { return this.message.messageStatus == 'READ'; }
  get containsOffer() { return this.message.offer != null; }

  public get isOwnMessage() { return (this.message.sendUser.id === this.myself?.id) ?? true; }


  constructor(private currentUserService: CurrentUserService,
    private offerService: OfferControllerService) { }

  ngOnInit(): void {
    this.UpdateOfferVisual();
  }


  private UpdateOfferVisual() {
    if (this.containsOffer) {
      if (this.message.offer?.state == 'ACCEPTED') {
        this.offerStatusIcon = this.faCheck;
        this.offerStatusText = 'Offer accepted';
        this.offerStatusClass = 'bg-success';
      }
      else if (this.message.offer?.state == 'PENDING') {
        this.offerStatusIcon = this.faHourglassHalf;
        this.offerStatusText = 'Offer pending';
        this.offerStatusClass = 'bg-warning';
      }
      else if (this.message.offer?.state == 'REJECTED') {
        this.offerStatusIcon = this.faXMark;
        this.offerStatusText = 'Offer rejected';
        this.offerStatusClass = 'bg-danger';
      }
    }
  }

  declineOffer() {
    if (!this.offer)
      return;
    var offer: OfferDTO = { ...this.offer, state: 'REJECTED' };

    this.offerService.updateOffer(offer, offer.id!).subscribe((offer) => {
      this.message.offer = offer;
      this.UpdateOfferVisual();
    });
  }


  acceptOffer() {
    if (!this.offer)
      return;
    var offer: OfferDTO = { ...this.offer, state: 'ACCEPTED' };

    this.offerService.updateOffer(offer, offer.id!).subscribe((offer) => {
      this.message.offer = offer;
      this.UpdateOfferVisual();
    });
  }




}
