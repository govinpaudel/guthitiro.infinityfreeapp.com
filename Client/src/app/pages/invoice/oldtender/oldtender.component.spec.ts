import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldtenderComponent } from './oldtender.component';

describe('OldtenderComponent', () => {
  let component: OldtenderComponent;
  let fixture: ComponentFixture<OldtenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldtenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
