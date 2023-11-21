import { Injectable } from '@angular/core';
import { TipoProducto } from '../interfaces/tipoProducto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TipoProductoService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'assets/db/tipoProducto.json';

  listAll():Observable<TipoProducto[]>{
    const url = `${this.apiUrl}`
    return this.http.get<TipoProducto[]>(url);
  }
}
