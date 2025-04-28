import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConverterPageComponent } from './converter-page.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyCode } from '../../enums/currency-code.enum';
import { ConvertCurrency } from '../../store/currency.actions';
import { IonicModule } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  const mockConvertedAmount = 1.2;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      declarations: [ConverterPageComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the Convert button when the amount field is invalid', () => {
    component.amount = -15;

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should enable the Convert button when the amount field is valid', fakeAsync(() => {
    component.amount = 10;
    fixture.detectChanges();
    tick();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalse();
  }));

  it('should display the conversion result', fakeAsync(() => {
    component.convertedAmount$ = of(mockConvertedAmount);
    fixture.detectChanges();
    tick();

    const result = fixture.nativeElement.querySelector('.result p');
    expect(result.textContent).toContain(mockConvertedAmount);
  }));

  it('should dispatch ConvertCurrency action when Convert button is clicked', fakeAsync(() => {
    component.amount = 10;
    component.fromCurrency = CurrencyCode.EUR;
    component.toCurrency = CurrencyCode.USD;
    fixture.detectChanges();
    tick();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(new ConvertCurrency(CurrencyCode.EUR, CurrencyCode.USD, 10));
  }));

  it('should display transaction history component when history exists', fakeAsync(() => {
    component.isHistoryExist$ = of(true);
    fixture.detectChanges();
    tick();

    const transactionHistory = fixture.nativeElement.querySelector('app-transaction-history');
    expect(transactionHistory).toBeTruthy();
  }));

  it('should not display transaction history component when history does not exist', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const transactionHistory = fixture.nativeElement.querySelector('app-transaction-history');
    expect(transactionHistory).toBeNull();
  }));
});
