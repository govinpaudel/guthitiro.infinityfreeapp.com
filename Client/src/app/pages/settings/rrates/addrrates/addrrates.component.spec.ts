import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrratesComponent } from './addrrates.component';

describe('AddrratesComponent', () => {
  let component: AddrratesComponent;
  let fixture: ComponentFixture<AddrratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddrratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
