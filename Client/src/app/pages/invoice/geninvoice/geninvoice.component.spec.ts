import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenInvoiceComponent } from './geninvoice.component';

describe('GenInvoiceComponent', () => {
  let component: GenInvoiceComponent;
  let fixture: ComponentFixture<GenInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
