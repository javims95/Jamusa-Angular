import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { DesktopComponent } from './desktop/desktop.component';
import { DetailsComponent } from './details/details.component';
import { OrdersComponent } from './orders/orders.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
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
];

export const MyAccountRoutes = RouterModule.forChild(routes);
