import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalsettingsComponent } from './localsettings.component';

describe('LocalsettingsComponent', () => {
  let component: LocalsettingsComponent;
  let fixture: ComponentFixture<LocalsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalsettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
