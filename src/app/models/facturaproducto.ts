export class FacturaProducto{
    constructor(
        
        public CodigoProducto :string,
        public NumeroFactura:string,
        public CantidadVendida :number,
        public Total :number,
        public codigoProductoNavigation:null

       
    ){}
}