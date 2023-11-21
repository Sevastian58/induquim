import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  windowWidth: number=0;
  navBarLeftWidth:string="60vw";
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
