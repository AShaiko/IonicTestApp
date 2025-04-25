import { Component } from '@angular/core';
import { Registration } from '../../../+shared/authorization/store/authorization.actions';
import { Store } from '@ngxs/store';
import { UserLoginModel } from '../../../models/user-login.model';

@Component({
  standalone: false,
  selector: 'app-registration-form',
  
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private store: Store) {}

  onRegister() {
    if (this.username && this.password) {
      const model = new UserLoginModel({
        username: this.username,
        password: this.password
      });
      this.store.dispatch(new Registration(model));
    }
  }
}
