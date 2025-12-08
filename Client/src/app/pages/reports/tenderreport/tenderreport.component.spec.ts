import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderreportComponent } from './tenderreport.component';

describe('TenderreportComponent', () => {
  let component: TenderreportComponent;
  let fixture: ComponentFixture<TenderreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
