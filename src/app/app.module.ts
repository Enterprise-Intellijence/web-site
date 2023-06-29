import { NgModule, Provider, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileDetailsComponent } from './pages/settings/profile-details/profile-details.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { ShippingComponent } from './pages/settings/shipping/shipping.component';
import { PaymentsComponent } from './pages/settings/payments/payments.component';
import { ProductPriceComponent } from './components/product-price/product-price.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgbdModalFocus } from "./components/modal-focus/modal-focus.component";

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FilteredProductListComponent } from './components/filtered-product-list/filtered-product-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DefaultProfilePicPipe } from './pipes/default-profile-pic.pipe';
import { BadgeTextPipe } from './pipes/badge-text.pipe';
import { PurchasingPageComponent } from './pages/purchasing-page/purchasing-page.component';
import { DefaultProductPicPipe } from './pipes/default-product-pic.pipe';
import { AlertModule } from './components/alerts/alert.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ApiInterceptor } from './interceptors/api-interceptor.interceptor';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ApiModule as BackendApiModule, Configuration as BackendApiConfig, UserControllerService } from './services/api-service';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';
import { LikedProductsPageComponent } from './pages/liked-products-page/liked-products-page.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { ConfirmRegistrationEmailComponent } from './pages/confirm-registration-email/confirm-registration-email.component';
import { PasswordMatchValidatorDirective } from './directives/forms/passwordMatch.directive';
import { ClosetComponent } from './components/closet/closet.component';
import { ReviewComponent } from './components/review/review.component';
import { NavBarMenuItemComponent } from './components/nav-bar-menu-item/nav-bar-menu-item.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { CategoryComponent } from './pages/administration/category/category.component';
import { ManageSizesComponent } from './pages/administration/manage-sizes/manage-sizes.component';
import { ProductsComponent } from './pages/administration/products/products.component';
import { ReportsComponent } from './pages/administration/reports/reports.component';
import { UsersComponent } from './pages/administration/users/users.component';
import { ReportSingleViewComponent } from './pages/administration/report-single-view/report-single-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { ApiModule as CountryCityModule, Configuration as CountryCiyConfig } from './services/country-city-api';
import { ConversationPreviewComponent } from './components/chat/conversation-preview/conversation-preview.component';
import { MessageComponent } from './components/chat/message/message.component';
import { EmptyClosetComponent } from './components/empty-closet/empty-closet.component';
import { AddNewSizeComponent } from './pages/administration/add-new-size/add-new-size.component';
import { ClickStopPropagationDirective } from "./directives/click-stop-propagation.directive";


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
    ProductPriceComponent,
    ProductImagesComponent,
    ProductComponent,
    ProductInfoComponent,
    HomePageComponent,
    BadgeTextPipe,
    ProductCardComponent,
    FilteredProductListComponent,
    ProfileComponent,
    DefaultProfilePicPipe,
    DefaultProductPicPipe,
    PurchasingPageComponent,
    MessagesPageComponent,
    LoginPageComponent,
    ReviewCardComponent,
    NewProductPageComponent,
    LikedProductsPageComponent,
    NavBarMenuItemComponent,
    CamelCasePipe,
    LoginFormComponent,
    RegisterFormComponent,
    ConfirmRegistrationEmailComponent,
    PasswordMatchValidatorDirective,
    UsersComponent,
    ClosetComponent,
    ReviewComponent,
    AdministrationComponent,
    CategoryComponent,
    ManageSizesComponent,
    ProductsComponent,
    ReportsComponent,
    ReportSingleViewComponent,
    FooterComponent,
    SearchPageComponent,
    ConversationPreviewComponent,
    MessageComponent,
    EmptyClosetComponent,
    AddNewSizeComponent,
    ClickStopPropagationDirective,
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
    BackendApiModule.forRoot(() => new BackendApiConfig({
      withCredentials: false,
      basePath: 'https://localhost:8443'
    })),
    CountryCityModule.forRoot(() => new CountryCiyConfig({
      apiKeys: {"X-CSCAPI-KEY": "ZXJ6emFVYUxmWnhxN2YzZnpQWFY3TENnRmF2SUd6cHZxTWdvRGdKWQ=="}
    })),
    FormsModule,
    NgbdModalFocus,
    UserCardComponent,
    ReactiveFormsModule,
  ]
})
export class AppModule { }
