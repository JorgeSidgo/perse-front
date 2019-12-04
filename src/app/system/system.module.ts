import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system/system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductCardLoadingComponent } from './products/product-card-loading/product-card-loading.component';
import { ProductModalAddComponent } from './products/product-modal-add/product-modal-add.component';
import { ProductModalEditComponent } from './products/product-modal-edit/product-modal-edit.component';
import { ProductModalDeleteComponent } from './products/product-modal-delete/product-modal-delete.component';
import { ProductModalDetailsComponent } from './products/product-modal-details/product-modal-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsModalAddComponent } from './clients/clients-modal-add/clients-modal-add.component';
import { ClientsModalDeleteComponent } from './clients/clients-modal-delete/clients-modal-delete.component';
import { ClientsModalDetailsComponent } from './clients/clients-modal-details/clients-modal-details.component';
import { ClientsModalEditComponent } from './clients/clients-modal-edit/clients-modal-edit.component';
import { PasswordInputComponent } from './commons/password-input/password-input.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { SellersComponent } from './sellers/sellers.component';



@NgModule({
  declarations: [SystemComponent, ProductsComponent, ProductCardComponent, ProductCardLoadingComponent, ProductModalAddComponent, ProductModalEditComponent, ProductModalDeleteComponent, ProductModalDetailsComponent, ClientsComponent, ClientsModalAddComponent, ClientsModalDeleteComponent, ClientsModalDetailsComponent, ClientsModalEditComponent, PasswordInputComponent, ClientHomeComponent, SellersComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
})
export class SystemModule { }
