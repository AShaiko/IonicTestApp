import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { NgxsModule, Store } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Registration } from '@shared/authorization/store/authorization.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [
        NgxsModule.forRoot([]),
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template tests:', () => {
    it('should create the form', () => {
      const formElement = fixture.nativeElement.querySelector('form');

      expect(formElement).toBeTruthy();
    });
  
    it('should display username required error', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('input[name="username"]');
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      tick();

      const error = fixture.nativeElement.querySelector('mat-error');
      expect(error.textContent).toContain('Username is required');
    }))
  
    it('should display password required error', fakeAsync(() => {
      const input = fixture.nativeElement.querySelector('input[name="password"]');
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      tick();

      const error = fixture.nativeElement.querySelector('mat-error');
      expect(error.textContent).toContain('Password is required');
    }));
  
    it('should disable submit button when form is invalid', fakeAsync(() => {
      component.username = 't'
      component.password = 'pas';
      component.confirmPassword = 'password';

      fixture.detectChanges();
      tick();

      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTrue();
    }));
  });

  describe('onRegister:', () => {
    it('should call store.dispatch on form submit', () => {
      component.username = 'validUser';
      component.password = 'validPass123';
      component.confirmPassword = 'validPass123';
  
      component.onRegister();
  
      expect(storeSpy.dispatch).toHaveBeenCalledTimes(1);
      expect(storeSpy.dispatch).toHaveBeenCalledWith(jasmine.any(Registration));
    });
  
    it('should not call store.dispatch if username is missing', () => {
      component.username = '';
      component.password = 'validPass123';
      component.confirmPassword = 'validPass123';
  
      component.onRegister();
  
      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });
  
    it('should not call store.dispatch if password is missing', () => {
      component.username = 'validUser';
      component.password = '';
      component.confirmPassword = 'validPass123';
  
      component.onRegister();
  
      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });
  });
});
