import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FlexModule} from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from "./main/shared/guards/auth.guard";
import { RequestInterceptor } from "./main/shared/interceptor/request.interceptor";
import { LoadingInterceptor } from "./main/shared/interceptor/loading.interceptor";
import {AuthService} from "./main/shared/services/auth.service";
import {InvoiceService} from "./main/shared/services/invoice.service";
import {ProgressBarComponent} from "./main/shared/components/progress-bar/progress-bar.component";
import {LoginComponent} from "./main/auth/login/login.component";
import {BaseLayoutComponent} from "./layout/base-layout/base-layout.component";
import {InvoiceListComponent} from "./main/invoice/list/list.component";
import {InvoiceFormComponent} from "./main/invoice/form/form.component";
import {RegisterComponent} from "./main/auth/register/register.component";
import {LoadingService} from "./main/shared/services/loading.service";

import {CenterLayoutComponent} from "./layout/center-layout/center-layout.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CleanLayoutComponent} from "./layout/clean-layout/clean-layout.component";

@NgModule({
  declarations: [
    ProgressBarComponent,
    AppComponent,
    BaseLayoutComponent,
    CenterLayoutComponent,
    CleanLayoutComponent,
    LoginComponent,
    RegisterComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    // MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatIconModule,
    FlexModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    LoadingService,
    AuthService,
    InvoiceService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
