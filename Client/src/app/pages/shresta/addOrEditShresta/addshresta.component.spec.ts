import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShrestaComponent } from './addshresta.component';

describe('AddShrestaComponent', () => {
  let component: AddShrestaComponent;
  let fixture: ComponentFixture<AddShrestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShrestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShrestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
