import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {
    path: 'app',
    component: SystemComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'clients', component: ClientsComponent }
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
