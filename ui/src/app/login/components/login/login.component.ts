import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SetCurrentUser } from '../../../+shared/authorization/store/authorization.actions';
import { APP_ROUTES } from '../../../+shared/constants/app-routes.const';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private isLoginActiveSubject = new BehaviorSubject<boolean>(true); 
  isLoginActive$ = this.isLoginActiveSubject.asObservable();

  subscriptions: Subscription[] = [];
  
  constructor(private actions$: Actions, private store: Store) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.actionsSubscription());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s && s.unsubscribe());
  }

  toggleLoginState(isLogin: boolean) {
    this.isLoginActiveSubject.next(isLogin); 
  }

  private actionsSubscription(): Subscription {
    return this.actions$.pipe(ofActionSuccessful(SetCurrentUser)).subscribe(({ payload }: SetCurrentUser) => {
        if (!payload || !payload.userId || !payload.username) {
            return;
        }

        this.store.dispatch(new Navigate([APP_ROUTES.Сonverter]));
    });
  }
}
