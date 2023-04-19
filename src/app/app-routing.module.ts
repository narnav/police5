import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { GrdGuardGuard } from './grd-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent , canActivate: [GrdGuardGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [GrdGuardGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
