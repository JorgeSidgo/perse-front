import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { SellersComponent } from './sellers/sellers.component';
import { RedemptionsComponent } from './redemptions/redemptions.component';
import { AuthGuard } from '../guards/auth.guard';
import { HistoryClientComponent } from './history-client/history-client.component';
import { PendingClientComponent } from './pending-client/pending-client.component';

const routes: Routes = [
  {
    path: 'app',
    component: SystemComponent,
    children: [
      { path: 'home', component: ClientHomeComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
      { path: 'sellers', component: SellersComponent, canActivate: [AuthGuard] },
      { path: 'client-history', component: HistoryClientComponent, canActivate: [AuthGuard] },
      { path: 'client-pending', component: PendingClientComponent, canActivate: [AuthGuard] },
      { path: 'exchange', component: RedemptionsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
