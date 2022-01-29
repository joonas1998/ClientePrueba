import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.services';
import {Producto} from '../models/producto';
import {FacturaProducto} from '../models/facturaproducto';

@Component({
    selector: 'producto-agregar',
    templateUrl: '../views/producto-agregar.html',
    providers:[ClientService]
  })

  export class ProductoAgregarComponent implements OnInit{
    public tiulo :string;
    public producto_register :Producto;
  
    
    public token:any;
    public identity:any;
    public errorMessage = null;
    public alertRegister:any;
  
  
    constructor(
      private _clienteservice : ClientService
    ){
      this.tiulo = 'guardar producto',
      this.producto_register = new Producto('','',0,0);
      
   
    }
  
   ngOnInit() {
       console.log("componente-productos OK");
    
      
   }
  
  onSubmitRegister(){
    //se valida que el stok y el valor unitario sean mayores a cero 
    if(this.producto_register.ValorUnitario > 0 && this.producto_register.Stock >0)
    {
            this._clienteservice.Register(this.producto_register,'Producto').subscribe(
              Response=>{
                console.log(Response);
              
                
                if(Response.Codigo == null)
                {
                  alert('Error al registrar el producto');
                }
          
                else{
                  this.alertRegister="Producto registrado correctamente ";
                  this.producto_register= new Producto('','',0,0);
          
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
    else{
      this.alertRegister = 'El valor unitario y el stock deben ser mayores a cero';
      this.producto_register= new Producto('','',0,0);
    }
  }


   




  }