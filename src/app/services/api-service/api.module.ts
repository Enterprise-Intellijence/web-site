import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { DeliveryControllerService } from './api/deliveryController.service';
import { MessageControllerService } from './api/messageController.service';
import { OfferControllerService } from './api/offerController.service';
import { OrderControllerService } from './api/orderController.service';
import { PaymentMethodControllerService } from './api/paymentMethodController.service';
import { ProductControllerService } from './api/productController.service';
import { ReviewControllerService } from './api/reviewController.service';
import { TransactionControllerService } from './api/transactionController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    DeliveryControllerService,
    MessageControllerService,
    OfferControllerService,
    OrderControllerService,
    PaymentMethodControllerService,
    ProductControllerService,
    ReviewControllerService,
    TransactionControllerService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
