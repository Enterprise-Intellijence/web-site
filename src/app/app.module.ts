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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileDetailsComponent,
    SettingsComponent,
    AccountSettingsComponent,
    ShippingComponent,
    PaymentsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
