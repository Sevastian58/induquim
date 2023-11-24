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
    const bannerDescripcion:HTMLElement = this.elRef.nativeElement.querySelector("#banner-descripcion");
    //verificamos que exista el elemento

    if(this.windowWidth%10==0){
      console.log("el resto es",this.windowWidth%10)
      bannerElement.style.backgroundImage = "url('../../../assets/img/banner" + this.i + ".jpg')";
    }

    if(bannerElement){
      if(this.windowWidth<=1200){
        //bannerElement.style.backgroundSize="contain";
       if(this.windowWidth<1100){
          bannerElement.style.height="60vh";
          bannerTexto.style.height="60%";
          //bannerTexto.style.display="block";
          //bannerDescripcion.style.height="70vh";
         // bannerDescripcion.style.width=this.windowWidth + "px";
        }
        if(this.windowWidth<1000){
          bannerElement.style.height="50vh";
          bannerTexto.style.height="70%";
          //bannerTexto.style.display="block";
          //bannerDescripcion.style.height="55vh";
          //bannerDescripcion.style.width=this.windowWidth + "px";
        }
        if(this.windowWidth<900){
          bannerElement.style.height="50vh";
          //bannerTexto.style.display="none";
          bannerDescripcion.style.height="50vh";
          bannerTexto.style.height="80%";
          //bannerDescripcion.style.width=this.windowWidth + "px";
        }
        if(this.windowWidth<730){
          bannerElement.style.height="30vh";
          bannerDescripcion.style.height="30vh";
          bannerTexto.style.height="100%";
          //bannerDescripcion.style.width=this.windowWidth + "px";
        }
        if(this.windowWidth<530){
          bannerElement.style.height="30vh";
          bannerDescripcion.style.height="30vh";
          bannerTexto.style.height="100%";
          //bannerDescripcion.style.width=this.windowWidth + "px";
        }
        if(this.windowWidth<400){
          bannerElement.style.height="30vh";
          //bannerDescripcion.style.height="14vh";
          //bannerDescripcion.style.width=this.windowWidth + "px";
        }

      }
      else{
        bannerElement.style.backgroundSize="cover";
        bannerElement.style.height="70vh";
        bannerDescripcion.style.height="70vh";
        bannerTexto.style.height="50%";
        //bannerTexto.style.display="block";
        //bannerDescripcion.style.width=this.windowWidth + "px";
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
      bannerElement.style.backgroundImage = "url('../../../assets/img/banner" + this.i + ".jpg')";

    }

    if (this.i < 4) {
      this.i++;
    } else {
      this.i = 1;
    }

    setTimeout(() => this.mostrarImagen(), 12000);
  }


  ajustarTamanioBanner(){

    var img = new Image();
    img.src="../../../assets/img/banner"+this.i+".jpg";

    let altura = img.naturalHeight
    let ancho = img.naturalWidth

    let relacion = altura/ancho
  }

}
