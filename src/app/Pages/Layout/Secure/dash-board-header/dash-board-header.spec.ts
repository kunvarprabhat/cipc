import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardHeader } from './dash-board-header';

describe('DashBoardHeader', () => {
  let component: DashBoardHeader;
  let fixture: ComponentFixture<DashBoardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoardHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoardHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
