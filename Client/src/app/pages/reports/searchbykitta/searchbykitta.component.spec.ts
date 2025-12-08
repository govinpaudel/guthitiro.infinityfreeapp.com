import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbykittaComponent } from './searchbykitta.component';

describe('SearchbykittaComponent', () => {
  let component: SearchbykittaComponent;
  let fixture: ComponentFixture<SearchbykittaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbykittaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbykittaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
