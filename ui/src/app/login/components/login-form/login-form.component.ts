import { Component } from '@angular/core';
import { UserLoginModel } from '../../../models/user-login.model';
import { Login } from '../../../+shared/authorization/store/authorization.actions';
import { Store } from '@ngxs/store';

@Component({
  standalone: false,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  username = '';
  password = '';

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
