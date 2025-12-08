import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinvoiceComponent } from './viewinvoice.component';

describe('ViewinvoiceComponent', () => {
  let component: ViewinvoiceComponent;
  let fixture: ComponentFixture<ViewinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
