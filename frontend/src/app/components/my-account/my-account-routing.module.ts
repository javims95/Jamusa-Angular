import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DesktopComponent } from './desktop/desktop.component';
import { DetailsComponent } from './details/details.component';
import { OrdersComponent } from './orders/orders.component';

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
    path:'change-password', 
    component: ChangePasswordComponent
  },
];

export const MyAccountRoutes = RouterModule.forChild(routes);
