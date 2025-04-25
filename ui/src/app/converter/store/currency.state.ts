import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CurrencyStateModel } from "./currency-state.model";
import { CurrencyCode } from "../enums/currency-code.enum";
import { CurrencyApiService } from "../services/currency-api.service";
import { ConvertCurrency } from "./currency.actions";
import { filter, tap } from "rxjs";
import { TransactionModel } from "../../models/transaction.model";


@State<CurrencyStateModel>({
    name: 'currencyState',
    defaults: {
        amount: 0,
        fromCurrency: CurrencyCode.EUR,
        toCurrency: CurrencyCode.USD,
        currentRate: null,
        convertedAmount: null,
        history: []
    }
})
@Injectable()
export class CurrencyState {
    @Selector()
    static convertedAmount(state: CurrencyStateModel): number | null {
        return state.convertedAmount;
    }

    @Selector()
    static history(state: CurrencyStateModel): TransactionModel[] {
        return state.history;
    }

    @Selector()
    static isHistoryExist(state: CurrencyStateModel): boolean {
        return state.history.length > 0;
    }
    
    constructor(private currencyApiService: CurrencyApiService) {}

    @Action(ConvertCurrency)
    onConvertCurrency({ getState, patchState }: StateContext<CurrencyStateModel>, { from, to, amount }: ConvertCurrency) {
        const state = getState();

        return this.currencyApiService.getRates(from, [to])
            .pipe(
                filter(data => !!data && !!data.data[to]),
                tap((data) => {
                    const rate: number = data.data[to];
                    const result = amount * rate;
                    const transaction: TransactionModel = {
                        timestamp: new Date(),
                        amount: amount,
                        from: from,
                        to: to,
                        rate: rate,
                        result: result
                    };

                    patchState({
                        fromCurrency: from,
                        toCurrency: to,
                        amount: amount,
                        currentRate: rate,
                        convertedAmount: result,
                        history: [transaction, ...state.history]
                    });
                })
        );
    }
}