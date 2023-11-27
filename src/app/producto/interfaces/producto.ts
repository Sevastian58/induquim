import { Composicion } from "./composicion";
import { Composicion_item } from "./composicion_item";
import { Dosificacion } from "./dosificacion";
import { TipoProducto } from "./tipoProducto";

export interface Producto{
  id:number,
  rs:string,
  name:string,
  tipoProducto:TipoProducto,
  indicaciones:string,
  periodo_retiro_descripcion:string,
  administracion:string,
  almacenamiento:string,
  contra_indicaciones:boolean,
  periodo_retiro:boolean,
  imagen_url:string[],
  color:string,
  composicion?:Composicion,
  dosificacion?:Dosificacion[]
}


