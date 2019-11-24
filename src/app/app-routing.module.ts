import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  /* { path: '**', redirectTo: 'app' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
