import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaratesComponent } from './addarates.component';

describe('AddratesComponent', () => {
  let component: AddaratesComponent;
  let fixture: ComponentFixture<AddaratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddaratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddaratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
