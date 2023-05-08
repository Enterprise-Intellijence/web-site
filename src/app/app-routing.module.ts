import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingComponent } from './pages/settings/shipping/shipping.component';
import { ProfileDetailsComponent } from './pages/settings/profile-details/profile-details.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { NotificationsComponent } from './pages/settings/notifications/notifications.component';
import { PaymentsComponent } from './pages/settings/payments/payments.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  // { path: 'user/:id', component: ProfilePageComponent },
  // { path: 'products/new', component: NewProductPageComponent },
  // { path: 'products/:id', component: ProductPageComponent },
  // { path: 'search', component: SearchPageComponent },
  // { path: 'login', component: LoginPageComponent },
  // { path: 'register', component: RegisterPageComponent },
  {
    path: 'settings', children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: ProfileDetailsComponent },
      { path: 'account', component: AccountSettingsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
