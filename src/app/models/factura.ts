import{FacturaProducto} from "../models/facturaproducto";

export class Factura {
    
    constructor(
        
        public NumeroFactura  : string,
        public IdentificacionCliente:string,
        public TotalFactura:number,
        public FaacturaProductos : FacturaProducto[]

       
    ){}
}