import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterPageComponent } from './components/converter-page/converter-page.component';
import { CurrencyApiService } from './services/currency-api.service';
import { CurrencyState } from './store/currency.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    ConverterPageComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    NgxsModule.forFeature([CurrencyState]),
  ],
  providers: [
    CurrencyApiService
  ]
})

export class ConverterModule {
  constructor(@Optional() @SkipSelf() parentModule: ConverterModule) {
    if (parentModule) {
        throw new Error('ConverterModule is already loaded');
    }
  }
}
