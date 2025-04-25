import { Component } from '@angular/core';
import { CurrencyCode, CurrencyNames } from '../../enums/currency-code.enum';
import { Store } from '@ngxs/store';
import { ConvertCurrency } from '../../store/currency.actions';
import { Observable } from 'rxjs';
import { CurrencyState } from '../../store/currency.state';

@Component({
  selector: 'app-converter-page',
  standalone: false,
  templateUrl: './converter-page.component.html',
  styleUrl: './converter-page.component.scss'
})
export class ConverterPageComponent {
  convertedAmount$: Observable<number | null>;
  isHistoryExist$: Observable<boolean>;

  amount: number = 1;
  fromCurrency: CurrencyCode = CurrencyCode.EUR;
  toCurrency: CurrencyCode = CurrencyCode.USD;

  currencyList = Object.values(CurrencyCode);
  currencyNames = CurrencyNames;

  constructor(private store: Store) {
    this.convertedAmount$ = this.store.select(CurrencyState.convertedAmount);
    this.isHistoryExist$ = this.store.select(CurrencyState.isHistoryExist);
  }

  onConvert() {
    this.store.dispatch(new ConvertCurrency(this.fromCurrency, this.toCurrency, this.amount));
  }
}
