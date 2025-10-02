import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Affiliated } from './affiliated';

describe('Affiliated', () => {
  let component: Affiliated;
  let fixture: ComponentFixture<Affiliated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Affiliated]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Affiliated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
