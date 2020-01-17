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
import { ClientHomeComponent } from './client-home/client-home.component';
import { SellersComponent } from './sellers/sellers.component';
import { NgxMaskModule } from 'ngx-mask';
import { OnlyLettersDirective } from '../directives/only-letters.directive';
import { OnlyNumbersDirective } from '../directives/only-numbers.directive';
import { ClientsModalPointsComponent } from './clients/clients-modal-points/clients-modal-points.component';
import { SellersModalAddComponent } from './sellers/sellers-modal-add/sellers-modal-add.component';
import { SellersModalDeleteComponent } from './sellers/sellers-modal-delete/sellers-modal-delete.component';
import { SellersModalDetailsComponent } from './sellers/sellers-modal-details/sellers-modal-details.component';
import { SellersModalEditComponent } from './sellers/sellers-modal-edit/sellers-modal-edit.component';
import { FormsModule } from '@angular/forms';
import { ClientHomeProductCardComponent } from './client-home/client-home-product-card/client-home-product-card.component';
import { ClientHomeProductCardLoadingComponent } from './client-home/client-home-product-card-loading/client-home-product-card-loading.component';
import { ClientHomeProductProgressCircleComponent } from './client-home/client-home-product-progress-circle/client-home-product-progress-circle.component';
import { RedemptionsComponent } from './redemptions/redemptions.component';
import { FormLoadingComponent } from './redemptions/form-loading/form-loading.component';
import { FormRedemptionComponent } from './redemptions/form-redemption/form-redemption.component';
import { CardRedemptionComponent } from './redemptions/card-redemption/card-redemption.component';
import { FullMenuComponent } from './system/full-menu/full-menu.component';
import { CheckoutModalComponent } from './redemptions/checkout-modal/checkout-modal.component';
import { HistoryClientComponent } from './history-client/history-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryClientCardComponent } from './history-client/history-client-card/history-client-card.component';
import { PendingClientComponent } from './pending-client/pending-client.component';
import { PendingClientCardComponent } from './pending-client/pending-client-card/pending-client-card.component';
import { ClientsModalSpamComponent } from './clients/clients-modal-spam/clients-modal-spam.component';



@NgModule({
  declarations: [
    OnlyNumbersDirective,
    OnlyLettersDirective,
    SystemComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductCardLoadingComponent,
    ProductModalAddComponent,
    ProductModalEditComponent,
    ProductModalDeleteComponent,
    ProductModalDetailsComponent,
    ClientsComponent,
    ClientsModalAddComponent,
    ClientsModalDeleteComponent,
    ClientsModalDetailsComponent,
    ClientsModalEditComponent,
    ClientHomeComponent,
    SellersComponent,
    ClientsModalPointsComponent,
    SellersModalAddComponent,
    SellersModalDeleteComponent,
    SellersModalDetailsComponent,
    SellersModalEditComponent,
    ClientHomeProductCardComponent,
    ClientHomeProductCardLoadingComponent,
    ClientHomeProductProgressCircleComponent,
    RedemptionsComponent,
    FormLoadingComponent,
    FormRedemptionComponent,
    CardRedemptionComponent,
    FullMenuComponent,
    CheckoutModalComponent,
    HistoryClientComponent,
    HistoryClientCardComponent,
    PendingClientComponent,
    PendingClientCardComponent,
    ClientsModalSpamComponent,],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
})
export class SystemModule { }
