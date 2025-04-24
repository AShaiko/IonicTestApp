import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  standalone: false,
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  onRegister() {
    if (this.username && this.password) {
      console.log('Register in with', this.username, this.password);
    }
  }
}
