import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.services';
import {Factura} from '../models/factura';
import {FacturaProducto} from '../models/facturaproducto';
import {Cliente} from '../models/cliente';
import {Producto} from '../models/producto';


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
  public listaProducto: any[] = [{Codigo:'dfsff', Descripcion: 'dedwdd', Cantidad: 4, Subtotal: 787}];
  public cantidad:number;
  public subtotal:number;
  public Total :number;

  
  public token:any;
  public identity:any;
  public errorMessage = null;
  public alertRegister:any;

  constructor(
    private _clienteservice : ClientService
  ){
    this.tiulo = 'guardar cliente',
    this.Factura_register = new Factura('','',0,null,[]);
    this.concepto_register = new FacturaProducto('','',1,1,null);
    this.listaConcepto =[];
    this.cliente = new Cliente('f','f','f','f','f');
    this.producto = new Producto('','',1,1);
    this.cantidad=1;
    this.subtotal=1;
    this.Total = 0;
  }


 ngOnInit() {
     console.log("cargado");
    
 }
 onSubmitRegister(){
  
 }

 getCliente(){
   this._clienteservice.GetCliente(this.cliente.Identificacion,'Cliente/').subscribe(
     Response => {
       this.cliente.Identificacion=Response.Identificacion;
       this.cliente.Nombre=Response.Nombre;
       this.cliente.Apellido=Response.Apellido;
       this.cliente.Direccion=Response.Direccion;
       this.cliente.Tipoidentificacion=Response.Tipoidentificacion;
     },
     error => {
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
 getProducto(){
  this._clienteservice.GetCliente(this.producto.Codigo,'Producto/').subscribe(
    Response => {
      
      this.producto.Codigo=Response.Codigo;
      this.producto.Descripcion=Response.Descripcion;
      this.producto.Stock=Response.Stock;
      this.producto.ValorUnitario=Response.ValorUnitario;
      
     console.log(Response);
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

registrarVenta()
{
  this._clienteservice.registerVenta(this.Factura_register).subscribe(
    Response => {
      console.log(Response);
    },
    error => {

    }
  );
}

addlistas()
{
  
  let listaP = {Codigo: this.producto.Codigo, Descripcion: this.producto.Descripcion, Cantidad:this.cantidad, Subtotal:this.subtotal};
  let listaPost = {CodigoProducto: this.producto.Codigo,NumeroFactura :this.Factura_register.NumeroFactura, CantidadVendida:this.cantidad, Total: this.Factura_register.TotalFactura, codigoProductoNavigation :this.Factura_register.identificacionClienteNavigation};
  this.listaProducto.push(listaP);
  this.listaConcepto.push(listaPost);
  
  this.Factura_register.FaacturaProductos.push(listaPost);
  this.Factura_register.IdentificacionCliente = this.cliente.Identificacion;
  console.log(listaPost);
  this.calcularTotal();
  this.calcularSubtotal();
  console.log(this.Factura_register);
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
    //recorre la lista de onjetos y suma el subtotal en un acumulador
    let Total =  this.listaProducto.reduce((acc,obj) => acc += (obj.Subtotal),0);
    this.Factura_register.TotalFactura= Total;
  
  }
}

}
