import { Directive } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, share, shareReplay, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { TOKEN_KEY } from './constants/local-storages.const';


@Directive()
export abstract class BaseApiService {
  protected apiRelativePath = `/api/`;

  protected errorDispatchEnabled = true;

  private _inFlight: any = {};

  constructor(protected http: HttpClient, protected store: Store) {}

  public handleError(response: string | HttpErrorResponse): void {
    if (response) {
      const isHttpError = response instanceof HttpErrorResponse;
      const message = isHttpError ? String(response.error?.message) || response.statusText : response;
      console.warn(message);
    }
  }

  protected httpGet<T>(
    url: string,
    ctor: (value: any) => T,
    tapBody: (value: T) => void = () => {},
    headers: HttpHeaders | undefined = undefined
  ): Observable<any> {
    if (this._inFlight[url.toLowerCase()]) {
      return this._inFlight[url.toLowerCase()];
    }
    const request: Observable<any> = this.http
      .get<T>(this.apiRelativePath + url, { observe: 'response', headers: this.getHeaders(headers) })
      .pipe(
        map((res: HttpResponse<T>): T => this.mapType<T>(res, ctor)),
        tap(tapBody),
        shareReplay(1)
      );
    this._inFlight[url.toLowerCase()] = request.pipe(take(1));
    request.subscribe({
      error: (error : string | HttpErrorResponse) => { 
        this.handleError(error) ;
        this.clearInFlight(url);
      },
      complete: () => this.clearInFlight(url)
    });

    return this._inFlight[url.toLowerCase()];
  }

  protected httpGetBlob(url: string): Observable<Blob> {
    if (this._inFlight[url.toLowerCase()]) {
      return this._inFlight[url.toLowerCase()];
    }
    return this.http.get(this.apiRelativePath + url, {
      responseType: 'blob',
      headers: this.getHeaders()
    });
  }
 
  protected httpPost<T>(
    url: string,
    ctor: (value: any) => T,
    data: any = null,
    tapBody: (value: T) => void = () => {},
    headers: HttpHeaders | undefined = undefined
  ): Observable<any> {
    const request: Observable<any> = this.http
      .post<T>(this.apiRelativePath + url, this.modelPostProcessing(data), { observe: 'response', headers: this.getHeaders(headers) })
      .pipe(
        map((res: HttpResponse<T>): T => this.mapType<T>(res, ctor)),
        tap(tapBody),
        share()
      );
    request.subscribe({ error: (error : string | HttpErrorResponse) => this.handleError(error) });

    return request.pipe(take(1));
  }
 

  protected httpPut<T>(
    url: string,
    ctor: (value: any) => T,
    data: any = null,
    headers: HttpHeaders | undefined = undefined
  ): Observable<any> {
    const request: Observable<any> = this.http
      .put<T>(this.apiRelativePath + url, this.modelPostProcessing(data), { observe: 'response', headers: this.getHeaders(headers) })
      .pipe(
        map((res: HttpResponse<T>) => this.mapType<T>(res, ctor)),
        share()
      );

    request.subscribe({ error: (error : string | HttpErrorResponse) => this.handleError(error) });

    return request;
  }

  protected httpDelete<T>(
    url: string,
    ctor: (value: any) => T,
    id: number | null = null,
    headers: HttpHeaders | undefined = undefined
  ): Observable<any> {
    const path = id && typeof id === 'number' && !isNaN(id) ? `${this.apiRelativePath}${url}/${id}` : `${this.apiRelativePath}${url}`;
    const request: Observable<any> = this.http
      .delete<T>(path, {
        observe: 'response',
        headers: this.getHeaders(headers)
      })
      .pipe(
        map((res: HttpResponse<T>) => this.mapType<T>(res, ctor)),
        share()
      );

    request.subscribe({ error: (error : string | HttpErrorResponse) => this.handleError(error) });

    return request;
  }

  protected getHeaders(headers: HttpHeaders | undefined = undefined): HttpHeaders {
    if (!headers) {
      headers = new HttpHeaders();
    }
        
    const tokenValue = localStorage.getItem(TOKEN_KEY);
    if (tokenValue) {
      headers = headers.set('Authorization', `Bearer ${tokenValue}`);
    }

    return headers;
  }

  protected mapType<T>(res: HttpResponse<T>, ctor: (value: any) => T): any {
    const val: any = res.status === 204 ? null : res.body;
    if (val === null) {
      return null;
    }

    if (val === '[]') {
      return [];
    }
    if (Array.isArray(val)) {
      return val.map(x => ctor(x));
    }
    return ctor(val);
  }

  protected modelPostProcessing<T>(model: T): T {
    return model;
  }

  private clearInFlight(url: string): void {
    if (this._inFlight[url.toLowerCase()]) {
      delete this._inFlight[url.toLowerCase()];
    }
  }
}
