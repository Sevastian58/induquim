import { TipoProducto } from "./tipoProducto";

export interface Producto{
  id:number,
  name:string,
  tipoProducto:TipoProducto,
  indicaciones:string,
  periodo_retiro_descripcion:string,
  administracion:string,
  almacenamiento:string,
  contra_indicaciones:boolean,
  periodo_retiro:boolean,
  imagen_url:string[]
}


