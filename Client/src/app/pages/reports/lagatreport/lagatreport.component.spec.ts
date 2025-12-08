import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LagatreportComponent } from './lagatreport.component';

describe('LagatreportComponent', () => {
  let component: LagatreportComponent;
  let fixture: ComponentFixture<LagatreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LagatreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LagatreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
