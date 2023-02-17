import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import {AuthorizerGuards} from "./guards/authorizer.guards";
import {LoginGuards} from "./guards/login.guards";

const routes: Routes = [
  {
    path: 'login',
    loadChildren:()=>import('./pages/publics/login/login.module').then((m)=>m.LoginModule),
    canActivate: [LoginGuards]
  },
  {
    path:'productos',
    loadChildren:()=>import('./pages/publics/productos/productos.module').then((m)=>m.ProductosModule),
    canActivate: [AuthorizerGuards]
  },
  { path: '**', redirectTo: 'productos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
