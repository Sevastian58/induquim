import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductoService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'assets/db/listaProductos.json';

  listAll():Observable<Producto[]>{
    const url = `${this.apiUrl}`
    return this.http.get<Producto[]>(url);
  }

  findById(id:number):Observable<Producto[]>{
    const url = `${this.apiUrl}`
    return this.http.get<Producto[]>(url).pipe(
      map(response=>response.filter(p=>p.id==id))
    );
  }

  filterByName(name:string):Observable<Producto[]>{
    const url = `${this.apiUrl}`
    return this.http.get<Producto[]>(url).pipe(
      map(response=>response.filter(p=>p.name.toLowerCase().includes(name.toLowerCase())))
    );
  }

  filterByTypeProduct(idTipo:number):Observable<Producto[]>{
    const url = `${this.apiUrl}`
    return this.http.get<Producto[]>(url).pipe(
      map(response=>response.filter(p=>p.tipoProducto.id==idTipo))
    );
  }

  filterByTypeProductAndName(idTipo:number, name:string):Observable<Producto[]>{
    const url = `${this.apiUrl}`
    return this.http.get<Producto[]>(url).pipe(
      map(response=>response.filter(p=>p.tipoProducto.id==idTipo && p.name.toLowerCase()==name.toLowerCase()))
    );
  }

}
