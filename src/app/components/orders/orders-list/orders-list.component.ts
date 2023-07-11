import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IconDefinition, faCheck, faCreditCard, faHome, faHourglassHalf, faStar, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { OrderBasicDTO, OrderControllerService } from 'src/app/services/api-service';
import State = OrderBasicDTO.StateEnum

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnChanges {

  faStar = faStar;
  faCheck = faCheck;
  faXmark = faXmark;
  faCreditCard = faCreditCard;
  faTruck = faTruck;
  faHome = faHome;
  faHourglass = faHourglassHalf;

  @Input() orderState?: OrderBasicDTO.StateEnum;
  @Input() title: string = '';
  @Input() HideIfEmpty: boolean = true;
  @Input() messageIfEmpty: string = 'No orders found';

  @Input() titleIconFromState: boolean = true;
  @Input() titleIcon?: IconDefinition;
  @Input() pageSize: number = 6;


  visualPage: number = 1;
  totalOrdersCount: number = 0;
  totalPages: number = 0;
  orders: OrderBasicDTO[] = [];


  constructor(private orderService: OrderControllerService) { }


  ngOnInit(): void {
    this.loadProductsPage(this.orderState);
    if (this.titleIconFromState)
      this.titleIcon = this.getStateIcon();
  }

  ngOnChanges(): void {
    this.loadProductsPage(this.orderState);
    if (this.titleIconFromState)
      this.titleIcon = this.getStateIcon();
  }

  loadProductsPage(state?: OrderBasicDTO.StateEnum) {
    this.orderService.getAllOrdersOfUser(state, this.visualPage - 1, this.pageSize).subscribe((orders) => {
      this.totalPages = orders.totalPages || 0;
      this.totalOrdersCount = orders.totalElements || 0;
      this.orders = orders.content || [];
    });
  }

  isEmpty(): boolean {
    return this.orders.length == 0;
  }

  pageChanged($event: number) {
    this.visualPage = $event;
    this.loadProductsPage(this.orderState);
  }

  getStateIcon(): IconDefinition | undefined {
    switch (this.orderState) {
      case undefined:
        return undefined;
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
        throw new Error(`Unknown state: ${this.orderState}`);
    }
  }

}
