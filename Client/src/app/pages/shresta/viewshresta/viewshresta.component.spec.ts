import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewshrestaComponent } from './viewshresta.component';

describe('ViewshrestaComponent', () => {
  let component: ViewshrestaComponent;
  let fixture: ComponentFixture<ViewshrestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewshrestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewshrestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
