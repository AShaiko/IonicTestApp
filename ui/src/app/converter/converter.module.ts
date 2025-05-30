import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterPageComponent } from './components/converter-page/converter-page.component';
import { CurrencyApiService } from './services/currency-api.service';
import { CurrencyState } from './store/currency.state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ConverterPageComponent,
    TransactionHistoryComponent
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    NgxsModule.forFeature([CurrencyState]),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    IonicModule.forRoot()
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
