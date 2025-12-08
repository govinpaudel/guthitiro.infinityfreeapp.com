import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdatesettingsComponent } from './addupdatesettings.component';

describe('AddupdatesettingsComponent', () => {
  let component: AddupdatesettingsComponent;
  let fixture: ComponentFixture<AddupdatesettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddupdatesettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddupdatesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
