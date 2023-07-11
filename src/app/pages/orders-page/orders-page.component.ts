import { Component, OnInit } from '@angular/core';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { OrderBasicDTO, OrderControllerService, OrderDTO, ProductBasicDTO } from 'src/app/services/api-service';

@Component({
  selector: 'orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  faOpen = faArrowUpRightFromSquare;

  pageSize: number = 5;
  visualPage: number = 1;
  totalOrdersCount: number = 0;

  orders: OrderBasicDTO[] = [];

  constructor(private orderService: OrderControllerService) { }


  ngOnInit(): void {
    this.loadProductsPage();
  }

  loadProductsPage(state?: OrderBasicDTO.StateEnum) {
    this.orderService.getAllOrdersOfUser(state, this.visualPage-1, this.pageSize).subscribe((orders) => {
      this.totalOrdersCount = orders.totalElements || 0;
      this.orders = orders.content || [];
    });
  }


}
