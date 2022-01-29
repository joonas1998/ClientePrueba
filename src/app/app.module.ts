import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//componentes
import { ClientAgregarComponent } from './components/client-agregar.component';
import { ProductoAgregarComponent } from './components/producto-agregar.component';
import { FacturaAgregarComponent } from './components/factura-agregar.component';
import { VentasList } from './components/factura-lista.component';

//routing
import { routing, AppRoutigProviders  } from './app.routing';

import { HttpClientModule } from '@angular/common/http';

//componentes
@NgModule({
  declarations: [
    AppComponent,
    ClientAgregarComponent,
    ProductoAgregarComponent,
    FacturaAgregarComponent,
    VentasList,
    

   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    routing
  ],
  providers: [AppRoutigProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
