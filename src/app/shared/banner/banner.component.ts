import { Component,ElementRef } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  windowWidth: number=0;
  i=2;
  constructor(private elRef: ElementRef){
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', this.onResize.bind(this));
    this.carrrusel();
  }


  ngOnInit(){
    this.onResize();
  }

  onResize() {
    this.windowWidth = window.innerWidth;

    const bannerElement:HTMLElement=this.elRef.nativeElement.querySelector('#banner');
    const bannerTexto: HTMLElement = this.elRef.nativeElement.querySelector('#banner-texto');
    //verificamos que exista el elemento

    if(bannerElement){
      if(this.windowWidth<=1200){
        bannerElement.style.backgroundSize="contain";
        if(this.windowWidth<1100){
          bannerElement.style.height="70vh";
          bannerTexto.style.display="block";
        }
        if(this.windowWidth<1000){
          bannerElement.style.height="55vh";
          bannerTexto.style.display="block";
        }
        if(this.windowWidth<900){
          bannerElement.style.height="50vh";
          bannerTexto.style.display="none";
        }
        if(this.windowWidth<730){
          bannerElement.style.height="30vh";
        }
        if(this.windowWidth<530){
          bannerElement.style.height="20vh";
        }
        if(this.windowWidth<400){
          bannerElement.style.height="14vh";
        }

      }
      else{
        bannerElement.style.backgroundSize="cover";
        bannerElement.style.height="80vh";
        bannerTexto.style.display="block";
      }
    }
    //alert(this.windowWidth)

  }

  carrrusel() {
    setTimeout(() => this.mostrarImagen(), 12000);
  }

  mostrarImagen() {
    const bannerElement: HTMLElement = this.elRef.nativeElement.querySelector('#banner');

    if (bannerElement) {
      bannerElement.style.transition="all 2s ease"
      bannerElement.style.backgroundImage = "url('../../../assets/img/banner" + this.i + ".png')";

      if(this.i==1){
        const desBannerH1Element: HTMLElement = this.elRef.nativeElement.querySelector('#banner-descripcion h1');
        const desBannerElement: HTMLElement = this.elRef.nativeElement.querySelector('#banner-descripcion');
        desBannerH1Element.style.color="black"
        desBannerElement.style.color="black"
      }
      else if(this.i==2){
        const desBannerH1Element: HTMLElement = this.elRef.nativeElement.querySelector('#banner-descripcion h1');
        const desBannerElement: HTMLElement = this.elRef.nativeElement.querySelector('#banner-descripcion');
        desBannerH1Element.style.color="white"
        desBannerElement.style.color="white"
      }

    }

    if (this.i == 1) {
      this.i++;
    } else {
      this.i = 1;
    }

    setTimeout(() => this.mostrarImagen(), 12000);
  }
}
