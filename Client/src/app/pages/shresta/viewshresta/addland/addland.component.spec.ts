import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandComponent } from './addland.component';

describe('AddLandComponent', () => {
  let component: AddLandComponent;
  let fixture: ComponentFixture<AddLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
