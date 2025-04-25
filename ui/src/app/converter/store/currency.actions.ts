import { CurrencyCode } from "../enums/currency-code.enum";

export class ConvertCurrency {
    static readonly type = '[Currency] Convert';
    constructor(public from: CurrencyCode, public to: CurrencyCode, public amount: number) {}
}