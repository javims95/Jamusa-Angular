
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesktopComponent } from './desktop/desktop.component';
import { DetailsComponent } from './details/details.component';
import { MyAccountRoutes } from './my-account-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyAccountRoutes,

  ],
  declarations: []
})
export class Root2Module { }