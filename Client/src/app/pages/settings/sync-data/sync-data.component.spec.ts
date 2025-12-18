import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncDataComponent } from './sync-data.component';

describe('SyncDataComponent', () => {
  let component: SyncDataComponent;
  let fixture: ComponentFixture<SyncDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
