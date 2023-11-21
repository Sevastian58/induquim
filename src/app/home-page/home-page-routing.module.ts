import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
      { path: 'home', component: HomePageComponent },

      // Otras rutas si es necesario
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'home' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
