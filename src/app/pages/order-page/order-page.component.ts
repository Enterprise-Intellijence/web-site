import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faCheck, faCreditCard, faHome, faHourglassHalf, faStar, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { OrderControllerService, OrderDTO, UserBasicDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';


import State = OrderDTO.StateEnum


@Component({
  selector: 'order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  faStar = faStar;
  faCheck = faCheck;
  faXmark = faXmark;
  faCreditCard = faCreditCard;
  faTruck = faTruck;
  faHome = faHome;
  faHourglass = faHourglassHalf;

  orderId!: string;
  order?: OrderDTO;


  get state() { return this.order!.state; }

  get wasReviewed()  { return this.state == State.REVIEWED; }
  get wasCompleted() { return this.state == State.COMPLETED || this.wasReviewed;  }
  get wasDelivered() { return this.state == State.DELIVERED || this.wasCompleted; }
  get wasShipped()   { return this.state == State.SHIPPED   || this.wasDelivered; }
  get wasPurchased() { return this.state == State.PURCHASED || this.wasShipped;   }
  get isPending()    { return this.state == State.PENDING;  }
  get isCanceled()   { return this.state == State.CANCELED; }


  get product() { return this.order!.product; }
  get buyer(): UserBasicDTO { return this.order!.user; }
  get seller(): UserBasicDTO { return this.order!.product!.seller!; }

  get hasOffer() { return this.order!.offer != undefined; }
  get offer() { return this.order!.offer; }

  get hasTransaction() { return this.order!.transaction != undefined; }
  get transaction() { return this.order!.transaction; }

  currentUserId?: string;

  get isBuyer() { return this.currentUserId == this.buyer.id; }
  get isSeller() { return this.currentUserId == this.seller.id; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderControllerService,
    private currentUserService: CurrentUserService,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params['orderId'];
      this.loadOrder();
    });

    this.currentUserService.user$.subscribe({
      next: (user) => {
        this.currentUserId = user?.id;
      }
    });

  }

  loadOrder() {
    this.orderService.getOrder(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        console.log("order loaded", order);
      },
      error: (err) => {
        console.error("error loading order", err);
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

}
