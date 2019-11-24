import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [
    NgZorroAntdModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
})
export class SharedModule { }
