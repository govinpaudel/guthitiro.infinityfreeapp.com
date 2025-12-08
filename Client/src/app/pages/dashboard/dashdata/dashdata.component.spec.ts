import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashdataComponent } from './dashdata.component';

describe('DashdataComponent', () => {
  let component: DashdataComponent;
  let fixture: ComponentFixture<DashdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
