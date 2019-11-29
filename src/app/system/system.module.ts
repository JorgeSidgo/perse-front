import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system/system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './commons/product-card/product-card.component';
import { ProductCardLoadingComponent } from './commons/product-card-loading/product-card-loading.component';



@NgModule({
  declarations: [SystemComponent, ProductsComponent, ProductCardComponent, ProductCardLoadingComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
})
export class SystemModule { }
