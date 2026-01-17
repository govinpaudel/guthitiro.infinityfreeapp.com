import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterratesComponent } from './updaterrates.component';

describe('UpdateratesComponent', () => {
  let component: UpdaterratesComponent;
  let fixture: ComponentFixture<UpdaterratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdaterratesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdaterratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
