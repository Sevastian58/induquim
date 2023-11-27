import { Component, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  windowWidth: number=0;
  correoTelefonoWidth: number = 0;

  constructor(private elRef: ElementRef, private cdr: ChangeDetectorRef){
    this.windowWidth = window.innerWidth;

    window.addEventListener('resize', this.onResize.bind(this));
  }


  onResize() {
    this.windowWidth = window.innerWidth;
    this.calculateWidth();
  }


  ngOnInit(){
    this.onResize();
    this.calculateWidth();
   }

   calculateWidth() {
    const correoTelefono: HTMLElement = this.elRef.nativeElement.querySelector('#correo-telefono');
    if (correoTelefono) {
      this.correoTelefonoWidth = correoTelefono.clientWidth;
      console.log('correoTelefonoWidth:', this.correoTelefonoWidth);
      console.log('windowWidth:', this.windowWidth);

      // Forzar la detección de cambios
      this.cdr.detectChanges();
    }
  }


  handleSubmit() {
    alert("se ejecutó el handleSubmit");

    const form: HTMLFormElement = this.elRef.nativeElement.querySelector('#formulario');
    const botonCorreo: HTMLElement = this.elRef.nativeElement.querySelector('#correo-destino');
    const formData = new FormData(form);
    botonCorreo.setAttribute("href", `mailto:induquimventas@gmail.com?subject=${"Estoy interesado(a) en tus productos"}&body=${formData.get("comentario")} Soy ${formData.get("nombre")} ${formData.get("apellido")},  mi teléfono es ${formData.get("telefono")} y mi correo ${formData.get("email")}`);
    botonCorreo.click();
    return false;  // Evitar la recarga de la página
  }

}
