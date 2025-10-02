import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyList } from './faculty-list';

describe('FacultyList', () => {
  let component: FacultyList;
  let fixture: ComponentFixture<FacultyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
