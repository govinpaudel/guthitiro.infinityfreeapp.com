import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyreportinvoiceComponent } from './monthlyreportinvoice.component';

describe('MonthlyreportinvoiceComponent', () => {
  let component: MonthlyreportinvoiceComponent;
  let fixture: ComponentFixture<MonthlyreportinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyreportinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyreportinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
