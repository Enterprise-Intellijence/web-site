import { NgModule, Provider, forwardRef } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MostRequestProductComponent } from './components/most-request-product/most-request-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DefaultProfilePicPipe } from './pipes/default-profile-pic.pipe';
import { BankAccountComponent } from './pages/settings/payments/bank-account/bank-account.component';
import { BadgeTextPipe } from './pipes/badge-text.pipe';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ApiInterceptor } from './interceptors/api-interceptor.interceptor';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

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
        BadgeTextPipe,
        ProductCardComponent,
        MostRequestProductComponent,
        ProfileComponent,
        DefaultProfilePicPipe,
        BankAccountComponent,
        MessagesPageComponent,
        LoginPageComponent
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
        ApiInterceptor,
        API_INTERCEPTOR_PROVIDER,
    ],
    bootstrap: [
        AppComponent,
        FontAwesomeModule,
        NgbModule,
        AppRoutingModule,
        BrowserModule,
      ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
        NgbdModalFocus,
    ]
})
export class AppModule { }
