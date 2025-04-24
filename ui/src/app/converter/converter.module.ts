import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterPageComponent } from './components/converter-page/converter-page.component';

@NgModule({
  declarations: [
    ConverterPageComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule
  ]
})
export class ConverterModule { }
