import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system/system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './commons/product-card/product-card.component';



@NgModule({
  declarations: [SystemComponent, ProductsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
})
export class SystemModule { }
