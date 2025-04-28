import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActionContext, Actions } from '@ngxs/store';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let actionsMock: Subject<ActionContext>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    actionsMock = new Subject<ActionContext>();
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: Actions, useValue: actionsMock },
        { provide: NavController, useValue: navCtrlSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template tests:', () => {
    it('should display login-form when isLoginActive is true', fakeAsync(() => {
      component.toggleLoginState(true);
      fixture.detectChanges();
      tick();
  
      const loginForm = fixture.nativeElement.querySelector('app-login-form');
      const registrationForm = fixture.nativeElement.querySelector('app-registration-form');
  
      expect(loginForm).toBeTruthy();
      expect(registrationForm).toBeFalsy();
    }));
  
    it('should display registration-form when isLoginActive is false', fakeAsync(() => {
      component.toggleLoginState(false);
      fixture.detectChanges();
      tick();
  
      const loginForm = fixture.nativeElement.querySelector('app-login-form');
      const registrationForm = fixture.nativeElement.querySelector('app-registration-form');
  
      expect(loginForm).toBeFalsy();
      expect(registrationForm).toBeTruthy();
    }));
  });

  describe('toggleLoginState()', () => {
    it('should set isLoginActive to true', fakeAsync(() => {
      let value: boolean | undefined;
      component.isLoginActive$.subscribe(v => value = v);

      component.toggleLoginState(true);
      tick();

      expect(value).toBeTrue();
    }));

    it('should set isLoginActive to false', fakeAsync(() => {
      let value: boolean | undefined;
      component.isLoginActive$.subscribe(v => value = v);

      component.toggleLoginState(false);
      tick();

      expect(value).toBeFalse();
    }));
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe all subscriptions', () => {
      const subscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
      component.subscriptions = [ subscription ];

      component.ngOnDestroy();

      expect(subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
