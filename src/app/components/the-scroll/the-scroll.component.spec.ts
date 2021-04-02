import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheScrollComponent } from './the-scroll.component';

describe('TheScrollComponent', () => {
  let component: TheScrollComponent;
  let fixture: ComponentFixture<TheScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
