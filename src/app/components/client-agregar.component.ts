import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.services';
import {Cliente} from '../models/cliente';

import { compileDeclareInjectableFromMetadata } from '@angular/compiler';

@Component({
  selector: 'client-agregar',
  templateUrl: '../views/client-agregar.html',
  providers:[ClientService]
})


export class ClientAgregarComponent implements OnInit{
  

  public objcliente: Cliente;
  public errorMessage = null;
  public alertRegister:any;

  constructor(
    private _clienteservice : ClientService

  ){
    this.objcliente = new Cliente('','','','','')
  }

 ngOnInit() {
     console.log("cargado");
    
 }
 onSubmitRegister(){
 this._clienteservice.Register(this.objcliente,'Cliente').subscribe(
    Response=>{
      this.objcliente.Identificacion = Response.Identificacion;
      this.objcliente.Nombre = Response.Nombre;
      this.objcliente.Apellido = Response.Apellido;
      this.objcliente.Direccion= Response.Direccion;
      

      if(this.objcliente.Identificacion == null)
      {
        
        alert('Error al registrar cliente');
      }

      else{
        console.log(this.objcliente);
        this.alertRegister="Cliente registrado exitosamente ";
        this.objcliente= new Cliente('','','','','');

      }
     
    },
    error =>{
      var errorMessage=(<any>error);
      if (errorMessage != null)
      {
        var parsedError = error.error.message;
        this.alertRegister = parsedError;
       // this.errorMessage = parsedError;
      }
    }
 ); 
 }
}
