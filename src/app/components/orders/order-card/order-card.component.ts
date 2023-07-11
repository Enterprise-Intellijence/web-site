import { Component, Input } from '@angular/core';
import { IconDefinition, faArrowUpRightFromSquare, faCheck, faCreditCard, faHome, faHourglassHalf, faStar, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { OrderBasicDTO } from 'src/app/services/api-service';

import State = OrderBasicDTO.StateEnum
@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  faStar = faStar;
  faCheck = faCheck;
  faXmark = faXmark;
  faCreditCard = faCreditCard;
  faTruck = faTruck;
  faHome = faHome;
  faHourglass = faHourglassHalf

  @Input("orderBasic") order!: OrderBasicDTO;
  faOpen = faArrowUpRightFromSquare;


  get state() { return this.order.state; }


  constructor() { }

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
