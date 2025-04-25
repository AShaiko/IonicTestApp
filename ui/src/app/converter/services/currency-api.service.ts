import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CurrencyApiService {
    private readonly API_URL = 'https://api.freecurrencyapi.com/v1/latest';
    private readonly API_KEY = 'fca_live_eZ8STbqO9aVsvFYV1JM0jLECB62epWbPuyf3IRte';
  
    constructor(private http: HttpClient) {}
  
    getRates(baseCurrency: string, targetCurrencies: string[]): Observable<any> {
      const params = new HttpParams()
        .set('apikey', this.API_KEY)
        .set('base_currency', baseCurrency)
        .set('currencies', targetCurrencies.join(','));
  
      return this.http.get(this.API_URL, { params });
    }
  }