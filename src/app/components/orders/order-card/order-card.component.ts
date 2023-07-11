import { Component, Input } from '@angular/core';
import { faArrowUpRightFromSquare, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { OrderBasicDTO } from 'src/app/services/api-service';

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  faStar = faStar;
  faCheck = faCheck;

  @Input("orderBasic") order!: OrderBasicDTO;
  faOpen = faArrowUpRightFromSquare;

  get state() { return this.order.state; }


  constructor() { }

  getStateColor(prefix: string = 'bg-', suffix: string = '') {
    let val;
    switch (this.state) {
      case 'CANCELED':
        val = 'secondary';
        break;
      case 'PENDING':
        val = 'warning'
        break;
      case 'PURCHASED' || 'SHIPPED' || 'DELIVERED' || 'COMPLETED' || 'REVIEWED':
        val = 'success'
        break;
      default:
        throw new Error(`Unknown state: ${this.state}`);
    }
    return prefix + val + suffix;
  }

  getStateIcon() {
    switch (this.state) {
      case 'CANCELED':
        return ;
      case 'PENDING':
        return ;
      case 'PURCHASED':
        return ;
      case 'SHIPPED':
        return ;
      case 'DELIVERED':
        return ;
      case 'COMPLETED':
        return ;
      case 'REVIEWED':
        return faStar;
      default:
        throw new Error(`Unknown state: ${this.state}`);
    }
  }
}
