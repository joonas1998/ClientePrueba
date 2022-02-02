import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.services';
import {Factura} from '../models/factura';
import {FacturaProducto} from '../models/facturaproducto';
import {Cliente} from '../models/cliente';
import {Producto} from '../models/producto';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'factura-agregar',
  templateUrl: '../views/factura-agregar.html',
  providers:[ClientService]
})


export class FacturaAgregarComponent implements OnInit{
  public tiulo :string;
  public cliente:Cliente;
  public producto:Producto;
  public Factura_register :Factura;
  public concepto_register :FacturaProducto;
  public listaConcepto: FacturaProducto[];
  //se define la lista que acumula el concepto de la venta 
  public listaProducto: any[] = [];

  //variables para hacer calculos 
  public cantidad:number;
  public subtotal:number;
  public Total :number;

  
  public token:any;
  public identity:any;
  public errorMessage = null;
  public alertRegister:any;
  public alertVenta : any;

  constructor(
    private _clienteservice : ClientService,
    private _router: Router,
    private _route :ActivatedRoute
  ){
    this.tiulo = 'guardar cliente',
    this.Factura_register = new Factura('','',0,[]);
    this.concepto_register = new FacturaProducto('','',1,1);
    this.listaConcepto =[];
    this.cliente = new Cliente('','','','','');
    this.producto = new Producto('','',0,0);
    this.cantidad=0;
    this.subtotal=0;
    this.Total = 0;
  }


 ngOnInit() {
     console.log("cargado");
     this.Factura_register.NumeroFactura = (this.generarcodigo(6));
    
 }
 onSubmitRegister(){
  
 }

 //metodo para consultar un cliente especifico y cargar un objeto del mismo tipo en el response
 getCliente(){
   if(this.cliente.Identificacion == '')
   {
    this.alertRegister ="La identificación del cliente es obligatoria"
   }else{
    this._clienteservice.GetCliente(this.cliente.Identificacion,'Cliente/').subscribe(
      Data => {
        let jsonstring = Data;
        this.cliente = jsonstring;
      },
      error => {
       var errorMessage=(<any>error);
       if (errorMessage != null)
       {
         var parsedError = error.error.message;
         console.log(parsedError);
       }
      }
    );
   }
 
 }

 //metodo para consultar un Producto especifico y cargar un objeto del mismo tipo 
 //en el response 
 getProducto(){
   if(this.producto.Codigo == '')
   {
     this.alertRegister ="El Código del producto es obligatorio"
   }else{
    this._clienteservice.GetCliente(this.producto.Codigo,'Producto/').subscribe(
      Data => {
        let jsonstring = Data;
        this.producto = jsonstring;

      
        
       console.log(this.producto);
      },
      error => {
       var errorMessage=(<any>error);
       if (errorMessage != null)
       {
         var parsedError = error.error.message;
         console.log(parsedError);
        
       }
      }
    );

   }

  
}

//se registra la venta pasando el objeto de tipo Factura ya cargado
registrarVenta()
{
 if(this.Factura_register.NumeroFactura == '')
 {
  this.Factura_register.NumeroFactura = this.generarcodigo(6);
 }else {
  if(this.Factura_register.IdentificacionCliente == ""){
    this.alertVenta = "Error en la venta";
    this.cliente = new Cliente('','','','','');
    this.producto = new Producto('','',0,0);
    this.cantidad=0;
    this.subtotal=0;
    this.Total = 0;
    this.listaProducto=[];
    this.listaConcepto=[];
    

  }else{
    this._clienteservice.registerVenta(this.Factura_register).subscribe(
      Response => {
        console.log(Response);
        console.log("Venta registrada correctamente");
        this._router.navigate(['/']);
      },
      error => {
        var errorMessage=(<any>error);
       if (errorMessage != null)
       {
         var parsedError = error.error.message;
         this.alertRegister = parsedError;
        
       }
  
      }
    );

  }
 }
  
}

addlistas()
{
  if(this.cantidad > this.producto.Stock)
  {
    this.alertRegister = "La cantidad vendida no debe superar el stock";
    this.producto = new Producto('','',0,0);
    this.subtotal =0;
    this.cantidad=0;
  }else{

    if(this.cliente.Identificacion == '')
    {
      this.alertRegister ="La identificación del cliente es obligatoria"
      this.cliente = new Cliente('','','','','');
    } else{

      if(this.producto.Codigo == '')
      {
        this.alertRegister ="El Código del producto es obligatorio";
        this.producto = new Producto('','',0,0);
      }else {
        
          //se define una estructura de los objetos que se guardarán en la lista 
        //lista que se carga en la tabla de ventas 
        let listaP = {Codigo: this.producto.Codigo, Descripcion: this.producto.Descripcion, Cantidad:this.cantidad, Subtotal:this.subtotal};
        // lista que se envia por post como concepto de la venta 
        let listaPost = {CodigoProducto: this.producto.Codigo,NumeroFactura :this.Factura_register.NumeroFactura, CantidadVendida:this.cantidad, Total: this.Factura_register.TotalFactura};
        //se cargan las listas
        this.listaProducto.push(listaP);
        this.listaConcepto.push(listaPost);
        //se carga la lista de conceptos  en el objeto instanciado tipo Factura 
        this.Factura_register.FaacturaProductos.push(listaPost);
        //se termina de cargar el objeto de tipo Factura 
        this.Factura_register.IdentificacionCliente = this.cliente.Identificacion;
        console.log(listaPost);
        //se instancian los metodos carcularTotal y calcularSubtotal para actualizar la tabla de conceptos y los cálculos
        this.calcularTotal();
        this.calcularSubtotal();
        console.log(this.Factura_register);
        this.producto = new Producto('','',0,0);
        this.subtotal =0;
        this.cantidad=0;

    }
  }
 }
}

eliminarobjlistas(index :number)
{
  //elimina un objero de la lista segun su indice 
this.listaProducto.splice(index,1);
//instancia el metodo para  calcular total para recargar el valor
this.calcularTotal();
}

calcularSubtotal(){
  //consigue el valor de subtotal multiplicando cantidad*valor unitario del producto
  this.subtotal = this.cantidad * this.producto.ValorUnitario;
}


calcularTotal(){
  {
    //recorre la lista de objetos y suma el subtotal en un acumulador
    let Total =  this.listaProducto.reduce((acc,obj) => acc += (obj.Subtotal),0);
    this.Factura_register.TotalFactura= Total;
  
  }
}

generarcodigo(longitud:any)
{
  

  let numeros = "0123456789";
  let letras = "abcdefghijklmnopqrstuvwxyz";
  let  cadena = "";
  let  todo = numeros+letras;
  //metodo para generar un codigo a partir de un strig
  // por cada recorrido selecciona un caracter y lo cancatena en una cadena de N longitud
  for(let i =0; i <longitud; i++)
  {
    let Naleatorio = Math.floor(Math.random() * todo.length);
    cadena += todo.charAt(Naleatorio);
  }
  return cadena;
}

}
