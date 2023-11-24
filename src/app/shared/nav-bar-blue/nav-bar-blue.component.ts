import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-blue',
  templateUrl: './nav-bar-blue.component.html',
  styleUrls: ['./nav-bar-blue.component.css'],

})
export class NavBarBlueComponent {
  windowWidth: number=0;
  navBarLeftWidth:string="67vw";
  navBarDisplay:string="block";

  constructor(){
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', this.onResize.bind(this));
  }


  onResize() {
    this.windowWidth = window.innerWidth;

    console.log(this.windowWidth)
  }
}
