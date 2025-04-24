import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private isLoginActiveSubject = new BehaviorSubject<boolean>(true); 
  isLoginActive$ = this.isLoginActiveSubject.asObservable();

  toggleLoginState(isLogin: boolean) {
    this.isLoginActiveSubject.next(isLogin); 
  }
}
