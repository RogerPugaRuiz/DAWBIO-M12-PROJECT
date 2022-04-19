import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBoardComponent } from './news-board.component';

describe('NewsBoardComponent', () => {
  let component: NewsBoardComponent;
  let fixture: ComponentFixture<NewsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
