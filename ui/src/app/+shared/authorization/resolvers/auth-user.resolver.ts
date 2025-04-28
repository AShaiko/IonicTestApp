import { catchError, filter, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Resolve, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserModel } from '../../../models/user.model';
import { AuthorizationState } from '../store/authorization.state';
import { LoadCurrentUser } from '../store/authorization.actions';
import { APP_ROUTES } from '../../constants/app-routes.const';

@Injectable()
export class AuthUserResolver implements Resolve<UserModel> {
  constructor(private store: Store, private router: Router) {}

  resolve(): Observable<UserModel> {
    const user = this.store.selectSnapshot(AuthorizationState.currentUser);
    return user
      ? of(user)
      : this.store.dispatch(new LoadCurrentUser()).pipe(
        mergeMap(() => this.store.selectOnce(AuthorizationState.currentUser)),
        filter((loadedUser): loadedUser is UserModel => !!loadedUser),
        catchError((error) => {
          this.router.navigate([APP_ROUTES.Login]);
          throw error
        })
      );
  }
}
