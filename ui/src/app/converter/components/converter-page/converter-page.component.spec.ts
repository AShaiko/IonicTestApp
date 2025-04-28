import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterPageComponent } from './converter-page.component';

describe('ConverterPageComponent', () => {
  let component: ConverterPageComponent;
  let fixture: ComponentFixture<ConverterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConverterPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConverterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
