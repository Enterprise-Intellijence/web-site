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

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MostRequestProductComponent } from './components/most-request-product/most-request-product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DefaultProfilePicPipe } from './pipes/default-profile-pic.pipe';
import { BankAccountComponent } from './pages/settings/payments/bank-account/bank-account.component';
import { BadgeTextPipe } from './pipes/badge-text.pipe';
import { PurchasingPageComponent } from './pages/purchasing-page/purchasing-page.component';
import { DefaultProductPicPipe } from './pipes/default-product-pic.pipe';
import { AlertModule } from './components/alerts/alert.module';
import { FormsModule } from '@angular/forms';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ApiInterceptor } from './interceptors/api-interceptor.interceptor';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ApiModule, Configuration, UserControllerService } from './services/api-service';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';
import { LikedProductsPageComponent } from './pages/liked-products-page/liked-products-page.component';
import { NavBarMenuItemComponent } from './components/nav-bar-menu-item/nav-bar-menu-item.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { ConfirmRegistrationEmailComponent } from './pages/confirm-registration-email/confirm-registration-email.component';
import { PasswordMatchValidatorDirective } from './directives/forms/passwordMatch.directive';
import { ClosetComponent } from './components/closet/closet.component';
import { ReviewComponent } from './components/review/review.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

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
    DefaultProductPicPipe,
    BankAccountComponent,
    PurchasingPageComponent,
    BankAccountComponent,
    MessagesPageComponent,
    LoginPageComponent,
    ReviewCardComponent,
    NewProductPageComponent,
    LikedProductsPageComponent,
    CamelCasePipe,
    LoginFormComponent,
    RegisterFormComponent,
    ConfirmRegistrationEmailComponent,
    PasswordMatchValidatorDirective
    NavBarMenuItemComponent,
    ClosetComponent,
    ReviewComponent
    ],
  providers: [
    HttpClient,
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
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
    BrowserModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    AlertModule,
    DropzoneModule,
    ApiModule.forRoot(() => new Configuration({
      withCredentials: false,
      basePath: 'https://localhost:8443'
    })),
    FormsModule,
    NgbdModalFocus,
  ]
})
export class AppModule { }
