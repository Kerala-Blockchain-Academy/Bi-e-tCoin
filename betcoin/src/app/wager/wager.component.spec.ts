import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagerComponent } from './wager.component';

describe('WagerComponent', () => {
  let component: WagerComponent;
  let fixture: ComponentFixture<WagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
