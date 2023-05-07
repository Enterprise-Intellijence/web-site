import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingComponent } from './pages/settings/shipping/shipping.component';
import { ProfileDetailsComponent } from './pages/settings/profile-details/profile-details.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { NotificationsComponent } from './pages/settings/notifications/notifications.component';
import { PaymentsComponent } from './pages/settings/payments/payments.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomePageComponent },
  // { path: 'user/:id', component: ProfilePageComponent },
  // { path: 'search', component: SearchPageComponent },
  // { path: 'login', component: LoginPageComponent },
  // { path: 'register', component: RegisterPageComponent },
  {
    path: 'settings', children: [
      { path: 'profile', component: ProfileDetailsComponent },
      { path: 'account', component: AccountSettingsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
