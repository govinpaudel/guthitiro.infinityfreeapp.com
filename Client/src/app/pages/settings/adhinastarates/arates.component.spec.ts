import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AratesComponent } from './arates.component';

describe('AratesComponent', () => {
  let component: AratesComponent;
  let fixture: ComponentFixture<AratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
