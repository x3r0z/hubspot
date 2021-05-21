import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./main/shared/guards/auth.guard";
import {LoginComponent} from "./main/auth/login/login.component";
import {BaseLayoutComponent} from "./layout/base-layout/base-layout.component";
import {InvoiceListComponent} from "./main/invoice/list/list.component";
import {InvoiceFormComponent} from "./main/invoice/form/form.component";
import {RegisterComponent} from "./main/auth/register/register.component";
import {CenterLayoutComponent} from "./layout/center-layout/center-layout.component";
import {CleanLayoutComponent} from "./layout/clean-layout/clean-layout.component";

const routes: Routes = [
  {
    path: 'login',
    component: CenterLayoutComponent,
    children:[
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'register',
    component: CleanLayoutComponent,
    children:[
      { path: '', component: RegisterComponent }
    ]
  },
  {
    path: 'invoice',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'list', component: InvoiceListComponent },
      { path: 'add', component: InvoiceFormComponent },
      { path: 'edit/:id', component: InvoiceFormComponent },
    ]
  },
  { path: '',   redirectTo: '/invoice/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
