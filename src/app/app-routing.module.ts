import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingComponent } from './pages/settings/shipping/shipping.component';
import { ProfileDetailsComponent } from './pages/settings/profile-details/profile-details.component';
import { AccountSettingsComponent } from './pages/settings/account-settings/account-settings.component';
import { PaymentsComponent } from './pages/settings/payments/payments.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PurchasingPageComponent } from './pages/purchasing-page/purchasing-page.component';
import { NewProductPageComponent } from './pages/new-product-page/new-product-page.component';
import { LikedProductsPageComponent } from './pages/liked-products-page/liked-products-page.component';
import { ProductComponent } from './pages/product/product.component';
import { ConfirmRegistrationEmailComponent } from './pages/confirm-registration-email/confirm-registration-email.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { CategoryComponent } from "./pages/administration/category/category.component";
import { ReportsComponent } from "./pages/administration/reports/reports.component";
import { UsersComponent } from "./pages/administration/users/users.component";
import { ProductsComponent } from "./pages/administration/products/products.component";
import { ManageSizesComponent } from "./pages/administration/manage-sizes/manage-sizes.component";
import { ReportSingleViewComponent } from "./pages/administration/report-single-view/report-single-view.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'users/:id', component: ProfileComponent },
  { path: 'users/me', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'liked-products', component: LikedProductsPageComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesPageComponent, canActivate: [AuthGuard] },
  { path: 'messages/:conversation-id', component: MessagesPageComponent, canActivate: [AuthGuard] },
  { path: 'messages/new/:user-id', component: MessagesPageComponent, canActivate: [AuthGuard] },
  { path: 'products/new', component: NewProductPageComponent, canActivate: [AuthGuard] },
  { path: 'search-page', component: SearchPageComponent },
  { path: 'products/:id', component: ProductComponent },
  // { path: 'search', component: SearchPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'confirm-registration-email', component: ConfirmRegistrationEmailComponent },
  { path: 'login-with-google-redirect', component: ProfileComponent },
  // { path: 'register', component: RegisterPageComponent },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile-details', pathMatch: 'full' },
      { path: 'profile-details', component: ProfileDetailsComponent },
      { path: 'account', component: AccountSettingsComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  },
  {
    path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard, AdminGuard], children: [
      { path: '', redirectTo: 'reports', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent },
      { path: 'report/id:', component: ReportSingleViewComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'manage-sizes', component: ManageSizesComponent },
    ]
  },

  { path: 'checkout/:id', component: PurchasingPageComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
