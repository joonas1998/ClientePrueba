import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
//clase que contien la URl de la API
import {GLOBAL} from './global';



@Injectable()
export class ClientService{
   
    public url: String;

    constructor (private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    
  
//metodo para registar en la BD
    Register(obj_Register:any,Ruta:string):Observable<any>{
      let json =JSON.stringify(obj_Register);
      let params = json;
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.post(this.url+Ruta, params, {headers: headers}).pipe(map(res => res));

    }
    //metodo para registrar Venta
    registerVenta(user_to_register:any):Observable<any>{
      let json =JSON.stringify(user_to_register);
      let params = json;
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.post(this.url+'Factura', params, {headers: headers}).pipe(map(res => res));

    }
     //metodo para consultar un cliente 
    GetCliente(Identifi:string,Ruta:string):Observable<any>{
      
      let params = Identifi;
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.get(this.url+Ruta+params ).pipe(map(res => res));

    }

    //metodo para consultar  todas las ventas
    GetVentas():Observable<any>{
      
      
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.get(this.url+'Factura',{headers:headers}).pipe(map(res => res));

    }
  
   


  

}