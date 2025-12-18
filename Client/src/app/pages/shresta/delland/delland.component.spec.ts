import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DellandComponent } from './delland.component';

describe('DellandComponent', () => {
  let component: DellandComponent;
  let fixture: ComponentFixture<DellandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DellandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DellandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
