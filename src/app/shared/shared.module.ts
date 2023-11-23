import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material.module';
import { BannerComponent } from './banner/banner.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavBarBlueComponent } from './nav-bar-blue/nav-bar-blue.component';




@NgModule({
  declarations: [
    NavBarComponent,
    NavBarBlueComponent,
    BannerComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    NavBarComponent,
    BannerComponent,
    MainComponent,
    FooterComponent,
    NavBarBlueComponent
  ]
})
export class SharedModule { }
