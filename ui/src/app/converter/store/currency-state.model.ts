import { CurrencyCode } from "../enums/currency-code.enum";

export interface CurrencyStateModel {
    amount: number;
    fromCurrency: CurrencyCode;
    toCurrency: CurrencyCode;
    currentRate: number | null;
    convertedAmount: number | null;
}
