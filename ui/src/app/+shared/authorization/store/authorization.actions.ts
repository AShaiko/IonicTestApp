import { UserLoginModel } from "../../../models/user-login.model";
import { UserModel } from "../../../models/user.model";

export class Login {
    static readonly type = '[Authorization] Login';

    constructor(public payload: UserLoginModel) {}
}

export class Registration {
    static readonly type = '[Authorization] Registration';

    constructor(public payload: UserLoginModel) {}
}

export class SetCurrentUser {
    static readonly type = '[Authorization] Set current user';

    constructor(public payload: UserModel | null) {}
}

export class LoadCurrentUser {
    static readonly type = '[Authorization] Load current user';
}
