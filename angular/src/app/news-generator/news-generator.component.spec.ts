import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsGeneratorComponent } from './news-generator.component';

describe('NewsGeneratorComponent', () => {
  let component: NewsGeneratorComponent;
  let fixture: ComponentFixture<NewsGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
