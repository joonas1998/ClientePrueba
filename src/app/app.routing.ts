import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";

//se importa el componente
import { ClientAgregarComponent } from './components/client-agregar.component';
import { ProductoAgregarComponent } from './components/producto-agregar.component';
import { FacturaAgregarComponent } from './components/factura-agregar.component';
import { VentasList } from './components/factura-lista.component';

const appRoutes: Routes = [
    {path:'', component: VentasList },
    {path:'Cliente', component: ClientAgregarComponent},
    {path:'Producto', component: ProductoAgregarComponent },
    {path:'Factura', component: FacturaAgregarComponent },
    {path:'**', component: ClientAgregarComponent}
    
];

export const AppRoutigProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);



