import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageRoutingModule } from './home-page/home-page-routing.module';
import { ProductoRoutingModule } from './producto/producto-routing.module';
import { AboutRoutingModule } from './about/about-routing.module';
import { ContactRoutingModule } from './contact/contact-routing.module';

const routes: Routes = [{
  path: 'home',
  loadChildren: () => import('./home-page/home-page.module').then(modulo => modulo.HomePageModule)
},
{
  path: 'producto',
  loadChildren: () => import('./producto/producto.module').then(modulo => modulo.ProductoModule)
},
{
  path: 'about',
  loadChildren: () => import('./about/about.module').then(modulo => modulo.AboutModule)
},
{
  path: 'contact',
  loadChildren: () => import('./contact/contact.module').then(modulo => modulo.ContactModule)
},
{
  path: '', // Ruta por defecto, cargar componente o página de inicio si es necesario
  pathMatch: 'full', // Asegura que solo coincida con la ruta vacía
  redirectTo: 'home' // Redirigir a 'byName' por defecto
},
{
  path: '**',
  redirectTo: 'home' // Redirigir rutas desconocidas a 'byName'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ContactRoutingModule,
  AboutRoutingModule,
  ProductoRoutingModule,
  HomePageRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
