import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthorizationApiService } from '../services/authorization-api.service';
import { AuthorizationStateModel } from './authorization.model';
import {
	LoadCurrentUser,
	Login,
	Registration,
	SetCurrentUser} from './authorization.actions';
import { TOKEN_KEY } from '../../constants/local-storages.const';
import { UserModel } from '../../../models/user.model';

@State<AuthorizationStateModel>({
	name: 'authState',
	defaults: {
		currentUser: null
	}
})
@Injectable()
export class AuthorizationState {
	@Selector()
	static currentUser(state: AuthorizationStateModel): UserModel | null {
		return state.currentUser;
	}

	constructor(private apiService: AuthorizationApiService) {}


	@Action(SetCurrentUser)
	onSetCurrentUser({ patchState }: StateContext<AuthorizationStateModel>, { payload }: SetCurrentUser): void {
		if (payload == null) {
			localStorage.removeItem(TOKEN_KEY);
		} else {
			localStorage.setItem(TOKEN_KEY, payload.token ?? '');
		}
		
		patchState({ currentUser: payload});
	}

	@Action(Login)
	onLogin({ dispatch }: StateContext<AuthorizationStateModel>, { payload }: Login): Observable<any> {
		return this.apiService.login(payload).pipe(
			tap((currentUser: UserModel) => {
				dispatch([new SetCurrentUser(currentUser)]);
			}),
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	@Action(Registration)
	onRegistration({ dispatch }: StateContext<AuthorizationStateModel>, { payload }: Registration): Observable<any> {
		return this.apiService.registration(payload).pipe(
			tap((currentUser: UserModel) => {
				dispatch([new SetCurrentUser(currentUser)]);
			}),
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	@Action(LoadCurrentUser)
	onLoadCurrentUser({ dispatch }: StateContext<AuthorizationStateModel>): Observable<UserModel> {
		return this.apiService.getCurrentUser().pipe(
			tap((currentUser: UserModel) => {
				dispatch([new SetCurrentUser(currentUser)]);
			})
		);
	}
}
