import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatearatesComponent } from './updatearates.component';

describe('UpdateratesComponent', () => {
  let component: UpdatearatesComponent;
  let fixture: ComponentFixture<UpdatearatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatearatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatearatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
