import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CurrencyStateModel } from "./currency-state.model";
import { CurrencyCode } from "../enums/currency-code.enum";
import { CurrencyApiService } from "../services/currency-api.service";
import { ConvertCurrency } from "./currency.actions";
import { tap } from "rxjs";


@State<CurrencyStateModel>({
    name: 'currencyState',
    defaults: {
        amount: 0,
        fromCurrency: CurrencyCode.EUR,
        toCurrency: CurrencyCode.USD,
        currentRate: null,
        convertedAmount: null
    }
})
@Injectable()
export class CurrencyState {
    @Selector()
    static convertedAmount(state: CurrencyStateModel): number | null {
        return state.convertedAmount;
    }
    
    constructor(private currencyApiService: CurrencyApiService) {}

    @Action(ConvertCurrency)
    onConvertCurrency({ getState, patchState }: StateContext<CurrencyStateModel>, { from, to, amount }: ConvertCurrency) {
        const state = getState();

        return this.currencyApiService.getRates(from, [to])
            .pipe(tap((data) => {
                const rate: number = data.data[state.toCurrency];
                const result = amount * rate;

                patchState({
                    fromCurrency: from,
                    toCurrency: to,
                    amount: amount,
                    currentRate: rate,
                    convertedAmount: result
                });
            })
        );
    }
}