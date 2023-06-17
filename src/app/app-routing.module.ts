import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingComponent } from './pages/settings/shipping/shipping.component';
import { ProfileDetailsComponent } from './pages/settings/profile-details/profile-details.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { NotificationsComponent } from './pages/settings/notifications/notifications.component';
import { PaymentsComponent } from './pages/settings/payments/payments.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import{ ProfileComponent } from './pages/profile/profile.component';
import { BankAccountComponent } from './pages/settings/payments/bank-account/bank-account.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PurchasingPageComponent } from './pages/purchasing-page/purchasing-page.component';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  // TODO: Just for test purposes the profile page is accessible from users/me but, when the user id
  //  is provided use the users/:id path
  // TODO: Add the :id to all the routerLink that are using the users/:id path
  { path: 'users/me', component: ProfileComponent },
  { path: 'users/:id', component: ProfileComponent },
  { path: 'messages', component: MessagesPageComponent },
  { path: 'products/new', component: NewProductPageComponent },
  // { path: 'products/:id', component: ProductPageComponent },
  // { path: 'search', component: SearchPageComponent },
  { path: 'login', component: LoginPageComponent },
  // { path: 'register', component: RegisterPageComponent },
  {
    path: 'settings', component: SettingsComponent, children: [
      { path: '', redirectTo: 'profile-details', pathMatch: 'full' },
      { path: 'profile-details', component: ProfileDetailsComponent },
      { path: 'account', component: AccountSettingsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  },

  { path: 'wallet/bank-account', component: BankAccountComponent },
  { path: 'purchasing-page', component: PurchasingPageComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
