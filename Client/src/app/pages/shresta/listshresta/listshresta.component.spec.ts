import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShrestaComponent } from './listshresta.component';

describe('ListShrestaComponent', () => {
  let component: ListShrestaComponent;
  let fixture: ComponentFixture<ListShrestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListShrestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShrestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
