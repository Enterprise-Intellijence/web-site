import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faCheck, faCreditCard, faHome, faHourglassHalf, faStar, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { AddressDTO, DeliveryControllerService, DeliveryCreateDTO, DeliveryDTO, OfferBasicDTO, OrderBasicDTO, OrderControllerService, OrderDTO, ReviewControllerService, ReviewCreateDTO, UserBasicDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';


import State = OrderDTO.StateEnum


@Component({
  selector: 'order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {


  faStar = faStar;
  faStarEmpty = faStarEmpty;
  faCheck = faCheck;
  faXmark = faXmark;
  faCreditCard = faCreditCard;
  faTruck = faTruck;
  faHome = faHome;
  faHourglass = faHourglassHalf;

  orderId!: string;
  order?: OrderDTO;

  reviewDescription: string = '';
  reviewRating: number = 5;
  reviewTitle: string = '';


  addresses: AddressDTO[] = [];
  selectedSenderAdress?: AddressDTO;

  get hasAddresses() { return this.addresses.length > 0; }
  get hasSelectedAddress() { return this.selectedSenderAdress != undefined; }


  get state() { return this.order!.state; }

  get wasReviewed() { return this.state == State.REVIEWED; }
  get wasCompleted() { return this.state == State.COMPLETED || this.wasReviewed; }
  get wasDelivered() { return this.state == State.DELIVERED || this.wasCompleted; }
  get wasShipped() { return this.state == State.SHIPPED || this.wasDelivered; }
  get wasPurchased() { return this.state == State.PURCHASED || this.wasShipped; }
  get isPending() { return this.state == State.PENDING; }
  get isCanceled() { return this.state == State.CANCELED; }


  get product() { return this.order!.product; }
  get buyer(): UserBasicDTO { return this.order!.user; }
  get seller(): UserBasicDTO { return this.order!.product!.seller!; }

  get hasOffer() { return this.order!.offer != undefined; }
  get offer() { return this.order!.offer; }

  get hasTransaction() { return this.order!.transaction != undefined; }
  get transaction() { return this.order!.transaction; }

  get hasDelivery() { return this.order!.delivery != undefined; }
  get delivery() { return this.order!.delivery; }


  currentUserId?: string;

  get isBuyer() { return !this.isSeller; }
  get isSeller() { return this.currentUserId == this.seller.id; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderControllerService,
    private deliveryService: DeliveryControllerService,
    private currentUserService: CurrentUserService,
    private reviewService: ReviewControllerService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params['orderId'];
      this.loadOrder();
    });

    this.currentUserService.user$.subscribe({
      next: (user) => {
        this.currentUserId = user?.id;
        this.addresses = user?.addresses ?? [];
      }
    });

  }

  loadOrder() {
    this.orderService.getOrder(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
      }
    });

  }

  canDoSomething(): boolean {
    return (this.canCancelOrder() || this.canCreateDelivery() || this.canMarkAsCompleted() || this.canWriteReview());
  }

  canCancelOrder(): boolean {
    if (this.isBuyer && this.isPending)
      return true;
    return false;
  }

  cancelOrder() {
    if (!this.canCancelOrder())
      return;

    // @ts-ignore
    let body: OrderDTO = {
      ...this.order!,
      state: OrderDTO.StateEnum.CANCELED
    }

    this.orderService.updateOrder(body, body?.id!).subscribe({
      next: (order) => {
        this.order = order;
        this.loadOrder();
      }
    });
  }



  canCreateDelivery(): boolean {
    if (this.isSeller && !this.hasDelivery && this.wasPurchased)
      return true;
    return false;
  }


  CreateDelivery() {
    if (!this.canCreateDelivery())
      return;

    if (this.selectedSenderAdress == undefined)
      return;

    let shippers = ['DHL', 'UPS', 'FedEx', 'USPS', 'Bartolini spa']
    let shipper = shippers[Math.floor(Math.random() * shippers.length)];

    let body: DeliveryCreateDTO = {
      order: this.order!,
      shipper: shipper,
      senderAddressId: this.selectedSenderAdress.id
    }

    this.deliveryService.createDelivery(body).subscribe({
      next: (delivery) => {
        this.order!.delivery = delivery;
        this.loadOrder();
      }
    })
  }

  toggleSelectSendersAddress(address: AddressDTO) {
    if(this.selectedSenderAdress == address)
      this.selectedSenderAdress = undefined;
    else
      this.selectedSenderAdress = address;
  }


  canMarkAsDelivered(): boolean {
    if (this.isSeller && this.hasDelivery && this.wasShipped && !this.wasDelivered)
      return true;
    return false;
  }

  MarkAsDelivered() {
    if (!this.canMarkAsDelivered())
      return;

    // @ts-ignore
    let body: DeliveryDTO = {
      ...this.delivery,
      deliveryStatus: DeliveryDTO.DeliveryStatusEnum.DELIVERED
    }

    this.deliveryService.updateDelivery(body, body?.id!).subscribe({
      next: (delivery) => {
        this.order!.delivery = delivery;
        this.loadOrder();
      }
    })
  }


  canMarkAsCompleted(): boolean {
    if (this.isBuyer && this.hasDelivery && this.wasDelivered && !this.wasCompleted)
      return true;
    return false;
  }

  MarkAsCompleted() {
    if (!this.canMarkAsCompleted())
      return;

    // @ts-ignore
    let body: OrderDTO = {
      ...this.order!,
      state: OrderDTO.StateEnum.COMPLETED
    }

    this.orderService.updateOrder(body, body?.id!).subscribe({
      next: (order) => {
        this.order = order;
        this.loadOrder();
      }
    })
  }

  canWriteReview(): boolean {
    if (this.isBuyer && this.state == State.COMPLETED)
      return true;
    return false;
  }

  canCreateReview(): boolean {
    if (!this.canWriteReview())
      return false;

    if (this.reviewDescription.trim().length == 0 ||
      (this.reviewRating < 1 || this.reviewRating > 5) ||
      (this.reviewTitle.trim().length == 0))
      return false;

    return true;
  }



  ReviewOrder() {
    if (!this.canCreateReview())
      return;

    // @ts-ignore
    let body: ReviewCreateDTO = {
      // @ts-ignore
      orderId: this.order?.id,
      title: this.reviewTitle,
      description: this.reviewDescription,
      vote: this.reviewRating,
      reviewed: this.buyer,
    }

    this.reviewService.createReview(body).subscribe({
      next: (review) => {
        this.loadOrder();
      }
    });
  }


  getStateColor(prefix: string = 'bg-', suffix: string = '') {
    let val;
    switch (this.state) {
      case State.CANCELED:
        val = 'danger';
        break;
      case State.PENDING:
        val = 'warning'
        break;
      case State.PURCHASED:
      case State.SHIPPED:
      case State.DELIVERED:
        val = 'secondary'
        break;
      case State.COMPLETED:
      case State.REVIEWED:
        val = 'success'
        break;
      default:
        throw new Error(`Unknown state: ${this.state}`);
    }
    return prefix + val + suffix;
  }

  getStateIcon(): IconDefinition {
    switch (this.state) {
      case State.CANCELED:
        return this.faXmark;
      case State.PENDING:
        return this.faHourglass;
      case State.PURCHASED:
        return this.faCreditCard;
      case State.SHIPPED:
        return this.faTruck;
      case State.DELIVERED:
        return this.faHome;
      case State.COMPLETED:
        return this.faCheck;
      case State.REVIEWED:
        return this.faStar;
      default:
        throw new Error(`Unknown state: ${this.state}`);
    }
  }


  getOfferStateColor() {
    switch (this.offer!.state) {
      case OfferBasicDTO.StateEnum.PENDING:
        return 'warning';
      case OfferBasicDTO.StateEnum.ACCEPTED:
        return 'success';
      case OfferBasicDTO.StateEnum.REJECTED:
      case OfferBasicDTO.StateEnum.CANCELLED:
        return 'danger';
      default:
        throw new Error(`Unknown offer state: ${this.offer!.state}`);
    }
  }

  getOfferStateIcon() {
    switch (this.offer!.state) {
      case OfferBasicDTO.StateEnum.PENDING:
        return this.faHourglass;
      case OfferBasicDTO.StateEnum.ACCEPTED:
        return this.faCheck;
      case OfferBasicDTO.StateEnum.REJECTED:
      case OfferBasicDTO.StateEnum.CANCELLED:
        return this.faXmark;
      default:
        throw new Error(`Unknown offer state: ${this.offer!.state}`);
    }
  }
}
