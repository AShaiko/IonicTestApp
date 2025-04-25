import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrencyState } from '../../store/currency.state';
import { TransactionModel } from '../../../models/transaction.model';

@Component({
  standalone: false,
  selector: 'app-transaction-history',
  
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss'
})
export class TransactionHistoryComponent {
  history$: Observable<TransactionModel[]>;

  constructor(private store: Store) {
    this.history$ = this.store.select(CurrencyState.history);
  }
}
