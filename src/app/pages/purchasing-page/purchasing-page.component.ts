import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressDTO, CustomMoneyDTO, OrderControllerService, OrderCreateDTO, PaymentMethodDTO, ProductControllerService, ProductDTO } from 'src/app/services/api-service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'purchasing-page',
  templateUrl: './purchasing-page.component.html',
  styleUrls: ['./purchasing-page.component.scss']
})
export class PurchasingPageComponent {


  faPlusIcon = faPlus;
  faCheck = faCheck;
  faXmark = faXmark;

  productId!: string;
  product!: ProductDTO;


  agreedProductCost?: CustomMoneyDTO;
  totalCost?: CustomMoneyDTO;

  addresses: AddressDTO[] = [];
  paymentMethods: PaymentMethodDTO[] = [];

  selectedAddress?: AddressDTO;
  selectedPaymentMethod?: PaymentMethodDTO;

  cardOwnerName: string = "";
  cardNumber: string = "";
  cardExpirationDay: string = "";
  cardSecurityCode: string = "";

  cardExpirationDayError: boolean = false;




  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductControllerService,
    private currentUserService: CurrentUserService,
    private modalService: NgbModal,
    private orderService: OrderControllerService,
  ) { }



  ngOnInit() {
    // get the product Id from the url example: /checkout/27959de9-88bf-417f-a263-b8a919d965c0
    this.activatedRoute.paramMap.subscribe(params => {
      if (!params.has('id')) {
        this.router.navigate(['']);
      }

      this.productId = params.get('id')!;
      this.loadProduct(this.productId);
    });


    this.currentUserService.user$.subscribe({
      next: (user) => {
        this.paymentMethods = user?.paymentMethods ?? [];
        this.addresses = user?.addresses ?? [];
      }
    })



  }

  loadProduct(productId: string) {
    this.productService.productById(productId).subscribe({
      next: (value: any) => {
        this.product = value;
        this.agreedProductCost = this.product.productCost;

        if (this.agreedProductCost?.currency != this.product.deliveryCost?.currency) {
          throw new Error("The currency of the product cost and the delivery cost must be the same");
        }

        this.totalCost = {
          price: this.agreedProductCost?.price!! + this.product.deliveryCost?.price!!,
          currency: this.agreedProductCost?.currency!!
        }
      }
    })
  }


  formatCardExpirationDay(event: string) {
    const cleanedValue = event.replace(/[^0-9]/g, '');


    if (cleanedValue.length > 2) {
      const month = cleanedValue.substring(0, 2);
      const year = cleanedValue.substring(2, 4);
      this.cardExpirationDay = `${month}/${year}`;

      const monthNumber = parseInt(month, 10);
      if (monthNumber < 1 || monthNumber > 12) {
        this.cardExpirationDayError = true;
      } else {
        this.cardExpirationDayError = false;
      }
    } else {
      this.cardExpirationDay = cleanedValue;
      this.cardExpirationDayError = false;
    }
  }


  openModal(modal: TemplateRef<any>) {
    this.modalService.open(modal, {});
  }


  toggleSelectAddress(address: AddressDTO) {
    if (this.selectedAddress?.id == address.id) {
      this.selectedAddress = undefined;
    }
    else {
      this.selectedAddress = address;
    }
  }

  toggleSelectPaymentMethod(paymentMethod: PaymentMethodDTO) {
    if (this.selectedPaymentMethod?.id == paymentMethod.id) {
      this.selectedPaymentMethod = undefined;
    }
    else {
      this.selectedPaymentMethod = paymentMethod;
    }
  }


  canCreateOrder() {
    return (this.selectedAddress != undefined && this.selectedPaymentMethod != undefined);
  }


  createOrder() {
    if(!this.canCreateOrder()) {
      throw new Error("Cannot create order");
    }

    let order: OrderCreateDTO = {
      deliveryAddress: this.selectedAddress!!,
      product: this.product
    }

    this.orderService.createOrder(order).subscribe({
      next: (order) => {
        this.router.navigate(['/orders', order.id]);
      }
    });
  }

  //TODO: fare in modo che se il toggle switch sia selezionato, non è possibile scegliere una posizione dalla mappa


}

