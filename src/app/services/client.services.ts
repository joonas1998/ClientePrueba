import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders  } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {GLOBAL} from './global';



@Injectable()
export class ClientService{
    public identity:any;
    public token:any;
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
    registerVenta(user_to_register:any):Observable<any>{
      let json =JSON.stringify(user_to_register);
      let params = json;
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.post(this.url+'Factura', params, {headers: headers}).pipe(map(res => res));

    }

    GetCliente(Identifi:string,Ruta:string):Observable<any>{
      
      let params = Identifi;
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.get(this.url+Ruta+params ).pipe(map(res => res));

    }
    GetVentas():Observable<any>{
      
      
     let headers = new HttpHeaders({'Content-Type':'application/json'});
      
     return this._http.get(this.url+'Factura',{headers:headers}).pipe(map(res => res));

    }
  
   
     //metodos para cargar las variables de sesion desde el local stograge
 getIdentity()
 {
  let identity = localStorage.getItem('identity');
  if(identity != undefined)
  {
    this.identity = identity;
   
  }else{
    this.identity=null;
  }
  return this.identity;
 }

 getToken()
 {
  let token = localStorage.getItem('token');
  if(token != undefined)
  {
    this.token = token;
    
  }else{
    this.token=null;
  }
  return this.token;
 }
 
prueba(){
  console.log('oelopa');
}

  

}