 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserLoginModel } from '../../../models/user-login.model';
import { BaseApiService } from '../../base-api.service';
import { UserModel } from '../../../models/user.model';



@Injectable()
export class AuthorizationApiService extends BaseApiService {
  constructor(http: HttpClient, store: Store) {
    super(http, store);
  }

  public login(model: UserLoginModel): Observable<UserModel> {
    return this.httpPost(`Auth/Login`, x => new UserModel(x), model);
  }

  public registration(model: UserLoginModel): Observable<UserModel> {
    return this.httpPost(`Auth/Register`, x => new UserModel(x), model);
  }

  public getCurrentUser(): Observable<UserModel> {
    return this.httpGet(`Auth/CurrentUser`, x => new UserModel(x));
  }
}
