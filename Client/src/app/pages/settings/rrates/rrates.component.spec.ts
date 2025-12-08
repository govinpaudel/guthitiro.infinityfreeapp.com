import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RratesComponent } from './rrates.component';

describe('RatesComponent', () => {
  let component: RratesComponent;
  let fixture: ComponentFixture<RratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
