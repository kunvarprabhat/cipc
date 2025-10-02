import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningList } from './learning-list';

describe('LearningList', () => {
  let component: LearningList;
  let fixture: ComponentFixture<LearningList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
