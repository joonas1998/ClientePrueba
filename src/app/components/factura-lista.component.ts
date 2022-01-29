import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.services';
import {Producto} from '../models/producto';
import {FacturaProducto} from '../models/facturaproducto';

import { Factura } from '../models/factura';


@Component({
    selector: 'factura-lista',
    templateUrl: '../views/factura-lista.html',
    providers:[ClientService]
  })

  export class VentasList implements OnInit{
    public tiulo :string;
    public objFactura:Factura;
    public objFacturaList :any;
    public objsonResponse:any;
  
    
   
  
  
    constructor(
      private _clienteservice : ClientService,
    
    ){
      this.tiulo = 'guardar producto',
      this.objFacturaList = [];
      this.objFactura=new Factura('','',0,null,[])
      
      
      
   
    }
  
    // se carga la tabla de ventas 
   ngOnInit() {
       this._clienteservice.GetVentas().subscribe(
         Data => {
            let res= Data;
            this.objsonResponse = Object.values(res);
            
         console.log(this.objFacturaList);
          

          
          
        },
         error =>{
           console.log("error");
         }
       );

      
   }
  
 
   




  }