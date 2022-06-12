// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DetailsComponent } from './components/my-account/details/details.component';
import { ChangePasswordComponent } from './components/my-account/change-password/change-password.component';
import { DesktopComponent } from './components/my-account/desktop/desktop.component';
import { AddressComponent } from './components/my-account/address/address.component';
import { OrdersComponent } from './components/my-account/orders/orders.component';
import { AdminNavbarComponent } from './admin/layouts/admin-navbar/admin-navbar.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';


// Providers
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyAccountComponent,
    FooterComponent,
    AdminComponent,
    AdminNavbarComponent,
    DesktopComponent,
    OrdersComponent,
    AddressComponent,
    DetailsComponent,
    ChangePasswordComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    // Token interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
