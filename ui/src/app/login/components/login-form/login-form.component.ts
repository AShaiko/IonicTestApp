import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  onLogin() {
    if (this.username && this.password) {
      console.log('Logging in with', this.username, this.password);
    }
  }
}
