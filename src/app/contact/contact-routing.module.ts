import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: 'contact',
    children: [
      { path: 'contact', component: ContactComponent },

      // Otras rutas si es necesario
      { path: '', redirectTo: 'contact', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'contact' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
