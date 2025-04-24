export class UserLoginModel {
    public username: string | undefined;
    public password: string | undefined;

    public constructor(
        fields?: Partial<UserLoginModel>) {

        if (fields) {
            Object.assign(this, fields);
        }
    }
}
