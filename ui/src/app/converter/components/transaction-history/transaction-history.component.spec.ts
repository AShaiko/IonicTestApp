import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TransactionModel } from '@models/transaction.model';
import { CommonModule } from '@angular/common';
import { CurrencyCode } from '../../enums/currency-code.enum';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  const mockHistory: TransactionModel[] = [
    {
      amount: 100,
      from: CurrencyCode.EUR,
      to: CurrencyCode.USD,
      result: 90,
      rate: 0.9,
      timestamp: new Date()
    },
    {
      amount: 200,
      from: CurrencyCode.EUR,
      to: CurrencyCode.GBP,
      result: 180,
      rate: 0.9,
      timestamp: new Date()
    }
  ];

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      declarations: [TransactionHistoryComponent],
      imports: [
        MatListModule,
        CommonModule
      ],
      providers: [
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.history$ = of(mockHistory);

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should display list of transactions', fakeAsync(() => {
    component.history$ = of(mockHistory);

    fixture.detectChanges();
    tick();

    const listItems = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(listItems.length).toBe(mockHistory.length);

    expect(listItems[0].textContent).toContain(mockHistory[0].amount);
    expect(listItems[0].textContent).toContain(mockHistory[0].from);
    expect(listItems[0].textContent).toContain(mockHistory[0].to);
    expect(listItems[0].textContent).toContain(mockHistory[0].result);

    expect(listItems[1].textContent).toContain(mockHistory[1].amount);
    expect(listItems[1].textContent).toContain(mockHistory[1].from);
    expect(listItems[1].textContent).toContain(mockHistory[1].to);
    expect(listItems[1].textContent).toContain(mockHistory[1].result);
  }));

  it('should render empty list when there are no transactions', () => {
    component.history$ = of([]);

    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll('mat-list-item');
    expect(listItems.length).toBe(0);
  });
});
