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
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MostRequestProductComponent } from './components/most-request-product/most-request-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DefaultProfilePicPipe } from './pipes/default-profile-pic.pipe';
import { BankAccountComponent } from './pages/settings/payments/bank-account/bank-account.component';
import { BadgeTextPipe } from './pipes/badge-text.pipe';
import { PurchasingPageComponent } from './pages/purchasing-page/purchasing-page.component';
import { DefaultProductPicPipe } from './pipes/default-product-pic.pipe';
import { AlertModule } from './components/alerts/alert.module';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { FormsModule } from '@angular/forms';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    acceptedFiles: 'image/*',
    createImageThumbnails: true
    };
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';

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
        DefaultProductPicPipe,
        BankAccountComponent,
        PurchasingPageComponent,
        BankAccountComponent,
        MessagesPageComponent
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
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    bootstrap: [
        AppComponent,
        FontAwesomeModule,
        NgbModule,
        AppRoutingModule,
        BrowserModule
      ],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        HttpClientModule,
        NgbdModalFocus,
        AlertModule,
        DropzoneModule,
        FormsModule
    ],
})
export class AppModule { }
