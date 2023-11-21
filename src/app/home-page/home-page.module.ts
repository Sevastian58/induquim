import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
    MaterialModule
  ]
})
export class HomePageModule { }
