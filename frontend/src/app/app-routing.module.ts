import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddressComponent } from './components/my-account/address/address.component';
import { DesktopComponent } from './components/my-account/desktop/desktop.component';
import { DetailsComponent } from './components/my-account/details/details.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { OrdersComponent } from './components/my-account/orders/orders.component';
import { ResetPasswordComponent } from './components/my-account/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [

  // Inicio
  {
    path: '',
    component: HomeComponent
  },
  // My account
  {
    path: 'my-account',
    component: MyAccountComponent,
    children: [
      {
        path:'desktop', 
        component: DesktopComponent
      },
      {
        path:'orders', 
        component: OrdersComponent
      },
      {
        path:'address', 
        component: AddressComponent
      },
      {
        path:'details', 
        component: DetailsComponent
      },
      {
        path:'reset-password', 
        component: ResetPasswordComponent
      },
    ]
  },
  // Login
  {
    path: 'login',
    component: LoginComponent
  },
  // Registro
  {
    path: 'register',
    component: RegisterComponent
  },

  // Admin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin'}
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
