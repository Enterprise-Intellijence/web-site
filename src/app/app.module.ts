import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileDetailsComponent } from './pages/settings/profile-details/profile-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { ShippingComponent } from './pages/settings/shipping/shipping.component';
import { PaymentsComponent } from './pages/settings/payments/payments.component';
import { NotificationsComponent } from './pages/settings/notifications/notifications.component';
import { ProductPriceComponent } from './components/product-price/product-price.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgbdModalFocus } from "./components/modal-focus/modal-focus.component";
import { DeliveryControllerService, MessageControllerService, OfferControllerService, OrderControllerService, PaymentMethodControllerService, ProductControllerService, ReviewControllerService, TransactionControllerService, UserControllerService } from './services/api-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TempCardComponent } from './components/temp-card/temp-card.component';
import { MostRequestProductComponent } from './components/most-request-product/most-request-product.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        ProfileDetailsComponent,
        SettingsComponent,
        AccountSettingsComponent,
        ShippingComponent,
        PaymentsComponent,
        NotificationsComponent,
        ProductPriceComponent,
        NotificationsComponent,
        ProductImagesComponent,
        ProductComponent,
        ProductInfoComponent,
        HomePageComponent,
        TempCardComponent,
        MostRequestProductComponent
    ],
    providers: [
        HttpClient,
        DeliveryControllerService,
        MessageControllerService,
        OfferControllerService,
        OrderControllerService,
        PaymentMethodControllerService,
        ProductControllerService,
        ReviewControllerService,
        TransactionControllerService,
        UserControllerService,
    ],
    bootstrap: [
        AppComponent,
        FontAwesomeModule,
        NgbModule,
        AppRoutingModule,
        BrowserModule
      ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        NgbdModalFocus
    ]
})
export class AppModule { }
