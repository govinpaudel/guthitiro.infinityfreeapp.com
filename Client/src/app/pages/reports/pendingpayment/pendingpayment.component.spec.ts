import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpaymentComponent } from './pendingpayment.component';

describe('PendingpaymentComponent', () => {
  let component: PendingpaymentComponent;
  let fixture: ComponentFixture<PendingpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingpaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
