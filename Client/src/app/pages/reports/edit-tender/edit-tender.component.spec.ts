import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenderComponent } from './edit-tender.component';

describe('EditTenderComponent', () => {
  let component: EditTenderComponent;
  let fixture: ComponentFixture<EditTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
