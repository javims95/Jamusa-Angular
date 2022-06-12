import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddressComponent } from './components/my-account/address/address.component';
import { ChangePasswordComponent } from './components/my-account/change-password/change-password.component';
import { DesktopComponent } from './components/my-account/desktop/desktop.component';
import { DetailsComponent } from './components/my-account/details/details.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { OrdersComponent } from './components/my-account/orders/orders.component';
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
    redirectTo: 'my-account/desktop'
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    data: {
      breadcrumb: 'Mi cuenta',
      icon: 'fa-solid fa-user'
    },
    children: [
      {
        path: 'desktop',
        component: DesktopComponent,
        data: {
          breadcrumb: 'Escritorio',
          icon: 'fa-solid fa-gauge-high'
        },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: {
          breadcrumb: 'Pedidos',
          icon: 'fa-solid fa-basket-shopping'
        },
      },
      {
        path: 'address',
        component: AddressComponent,
        data: {
          breadcrumb: 'Direcciones',
          icon: 'fa-solid fa-address-card'
        },
      },
      {
        path: 'details',
        component: DetailsComponent,
        data: {
          breadcrumb: 'Detalles de mi cuenta',
          icon: 'fa-solid fa-circle-info'
        },
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          breadcrumb: 'Cambiar contraseña',
          icon: 'fa-solid fa-lock'
        },
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
    data: { expectedRole: 'admin' }
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
