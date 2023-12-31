import { Component, ElementRef } from '@angular/core';
import { Producto } from 'src/app/producto/interfaces/producto';
import { TipoProducto } from 'src/app/producto/interfaces/tipoProducto';
import { ProductoService } from 'src/app/producto/services/producto.service';
import { TipoProductoService } from 'src/app/producto/services/tipoProducto.service';
import { map } from 'rxjs/operators';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  windowWidth: number=0;
  backgroundImage:string="url('../../../assets/img/animales/perrito.png')";
  listaProductos:Producto[]=[];

  listaProductos1:Producto[]=[];
  listaProductos2:Producto[]=[];
  listaProductos3:Producto[]=[];

  listaProductosReverso:Producto[]=[]
  listaProductosLimit:Producto[]=[];
  listaTipoProductos:TipoProducto[]=[]
  mouseSobreElemento = false;

  constructor(private productoService:ProductoService, private tipoProductoService:TipoProductoService,
              private elRef: ElementRef){
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnInit(){
    this.listarTipoProductos();
    this.listarProductos();
    if(this.listaProductos.length>0){
      this.limitarListaProductos();
    }
   }

   ngAfterViewInit() {

    setTimeout(() => {
      this.onResize();
    }, 2000);

  }


   obtenerBackgroudImage(ruta:string):string{
    let url:string  ="url(" +ruta+")";
    return url
   }

  listarProductos(){
    this.productoService.listAll().subscribe(response=>{
      if(response){
        this.listaProductos=response;
        this.limitarListaProductos();
        this.invertirListaProductos(this.listaProductos)
        this.listarProductosMain();
        console.log(response)
      }
    })
  }

  listarTipoProductos(){
    this.tipoProductoService.listAll().subscribe(response=>{
      if(response){
        this.listaTipoProductos=response
      }
    })
  }

  cambiarColorHover(event: MouseEvent) {

    //definimos la ruta base
    let rutaBase = "../../../assets/img/icon/"



    console.log("Evento:", event);
    this.mouseSobreElemento = !this.mouseSobreElemento;
    const elemento = event.currentTarget as HTMLElement;
    //if(this.mouseSobreElemento==true){
      const backgroundColor = window.getComputedStyle(elemento).backgroundColor;
      console.log("inicio", backgroundColor);

      if (backgroundColor === "" || backgroundColor === "rgb(36, 175, 244)") {
      elemento.style.backgroundColor = '#b3e6ff';


      console.log("mouseover",elemento.style.backgroundColor)
      if(elemento.querySelector("img")){

        let posRutaInit = elemento.querySelector("img")!.src.indexOf("vitamina")
        let posRutaFin = elemento.querySelector("img")!.src.indexOf("-white.png")

        elemento.querySelector("img")!.src=rutaBase + elemento.querySelector("img")!.src.substring(posRutaInit,posRutaFin)  + ".png";

      }
      if(elemento.querySelector("button")){
        elemento.querySelector("button")?.setAttribute("class", "btn btn-primary m-3")
      }
      if(elemento.querySelector("h4")){
        elemento.querySelector("h4")!.style.color="black"

      }
    }else if (backgroundColor === "rgb(179, 230, 255)") {
      elemento.style.backgroundColor = '#24aff4';
      console.log("mouseout",elemento.style.backgroundColor)
      if(elemento.querySelector("img")){
        let posRutaInit = elemento.querySelector("img")!.src.indexOf("vitamina")
        let posRutaFin = elemento.querySelector("img")!.src.indexOf(".png")

        console.log("la ruta netlify es", elemento.querySelector("img")!.src)

        elemento.querySelector("img")!.src=rutaBase + elemento.querySelector("img")!.src.substring(posRutaInit,posRutaFin)  + "-white.png";

      }
      if(elemento.querySelector("button")){
        elemento.querySelector("button")?.setAttribute("class", "btn btn-light m-3")
      }
      if(elemento.querySelector("h4")){
        elemento.querySelector("h4")!.style.color="white"

      }
    }


  }




  limitarListaProductos(){
    for(let i=0; i<this.listaProductos.length && i<4; i++){
      this.listaProductosLimit.push(this.listaProductos[i]);
    }

    console.log("lista productos limit", this.listaProductosLimit)
  }

  invertirListaProductos(productos:Producto[]){
    for(let i=productos.length-1; i>=0; i--){
      this.listaProductosReverso.push(productos[i])
    }
  }

  listarProductosMain(){
    console.log("estoy en el productos main")
    this.listaProductos.forEach(p=>{
      console.log("estoy en el productos main-foreach")
      if(p.id==1 || p.id==3 || p.id==5){
        this.listaProductos1.push(p)
        console.log("lista productos 1", this.listaProductos1.length)
      }

      if(p.id==2 || p.id==4 || p.id==10){
        this.listaProductos2.push(p)
        console.log("lista productos 2", this.listaProductos2.length)
      }

      if(p.id==14 || p.id==17 || p.id==21){
        this.listaProductos3.push(p)
        console.log("lista productos 3", this.listaProductos3.length)
      }
    })
  }


  /*onResize() {

    this.windowWidth = window.innerWidth;

    const elementLeft:[HTMLElement]=this.elRef.nativeElement.querySelector('.producto-item-left');
    const elementRight:[HTMLElement]=this.elRef.nativeElement.querySelector('.producto-item-right');

    //verificamos que exista el elemento

    if(elementLeft && elementRight){



      let difElementLeft  = (this.windowWidth - parseInt(window.getComputedStyle(elementLeft[0]).width)) / 2;
      let difElementRight = (this.windowWidth - parseInt(window.getComputedStyle(elementRight[0]).width)) / 2;

      if(this.windowWidth<=900){

          elementLeft.forEach(x=>{
            x.style.marginLeft=difElementLeft + "px";
            x.style.marginRight="0";
          })


          elementRight.forEach(x => {
            x.style.marginRight=difElementRight + "px";
            x.style.marginLeft=difElementRight + "px";
          });


      }
      else{

        elementLeft.forEach(x=>{
          x.style.marginLeft="0";
          x.style.marginRight="7%";
        })


        elementRight.forEach(x => {

          x.style.marginRight="0";
          x.style.marginLeft="15%";
        });

      }
    }
    //alert(this.windowWidth)

  }*/

  onResize() {
    this.windowWidth = window.innerWidth;

    const elementsLeft: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll('.producto-item-left');
    const elementsRight: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll('.producto-item-right');

    console.log("el ancho es ", this.windowWidth)
    let difElementLeft = (this.windowWidth - parseInt(window.getComputedStyle(elementsLeft[0]).width)) / 2;
    let difElementRight = (this.windowWidth - parseInt(window.getComputedStyle(elementsRight[0]).width)) / 2;

    // Iterar sobre los elementos izquierdos
    elementsLeft.forEach((element: HTMLElement) => {


      if (this.windowWidth <= 900 && (difElementLeft*2+parseInt(window.getComputedStyle(element).width))<=this.windowWidth) {
        element.style.marginLeft = difElementLeft + "px";
        element.style.marginRight = "0";
      } else {
        element.style.marginLeft = "0";
        element.style.marginRight = "7%";
      }
    });

    // Iterar sobre los elementos derechos
    elementsRight.forEach((element: HTMLElement) => {


      if (this.windowWidth <= 900) {
        element.style.marginRight = difElementRight + "px";
        element.style.marginLeft = difElementRight + "px";
      } else {
        element.style.marginRight = "0";
        element.style.marginLeft = "15%";
      }
    });



    this.resizePasarelaMultiElemento();
  }

  resizePasarelaMultiElemento() {
    this.windowWidth = window.innerWidth;
    const contenedores: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll('.contenedor');
    const items: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll('.item-card');
    let heightItem = window.getComputedStyle(items[0]).height;

    if (this.windowWidth <= 900) {
      contenedores.forEach((element: HTMLElement) => {
        element.style.height = "auto";
      });
    } else {
      heightItem = heightItem + 50;
      contenedores.forEach((element: HTMLElement) => {
        element.style.height = heightItem + "px";
      });
    }
  }


}
