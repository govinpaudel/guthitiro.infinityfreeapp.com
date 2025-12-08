import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountformComponent } from './discountform.component';

describe('DiscountformComponent', () => {
  let component: DiscountformComponent;
  let fixture: ComponentFixture<DiscountformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
