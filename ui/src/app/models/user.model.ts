export class UserModel {
    public userId: string | undefined;
    public token: string | undefined;
    public username: number | undefined;

    public constructor(
        fields?: Partial<UserModel>) {

        if (fields) {
            Object.assign(this, fields);
        }
    }
}
