import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";
import { CurrencyStateModel } from "./currency-state.model";
import { CurrencyCode } from "../enums/currency-code.enum";


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
}