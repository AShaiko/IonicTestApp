import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterPageComponent } from './components/converter-page/converter-page.component';
import { CurrencyService } from './services/currency-api.service';

@NgModule({
  declarations: [
    ConverterPageComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule
  ],
  providers: [
    CurrencyService
  ]
})
export class ConverterModule { }
