import { Component } from '@angular/core';
import { UserLoginModel } from '../../../models/user-login.model';
import { Login } from '../../../+shared/authorization/store/authorization.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  constructor(private store: Store) {}

  onLogin() {
    if (this.username && this.password) {
      const model = new UserLoginModel({
        username: this.username,
        password: this.password
      });
      this.store.dispatch(new Login(model));
    }
  }
}
