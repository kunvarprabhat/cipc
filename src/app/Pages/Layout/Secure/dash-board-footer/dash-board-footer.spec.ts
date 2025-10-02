import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardFooter } from './dash-board-footer';

describe('DashBoardFooter', () => {
  let component: DashBoardFooter;
  let fixture: ComponentFixture<DashBoardFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
