import { UserModel } from "../../../models/user.model";

export interface AuthorizationStateModel {
    currentUser: UserModel | null;
}
