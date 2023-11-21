import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: 'about',
    children: [
      { path: 'about', component: AboutComponent },

      // Otras rutas si es necesario
      { path: '', redirectTo: 'about', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'about' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
