import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllocateComponent } from './view-allocate.component';

describe('ViewAllocateComponent', () => {
  let component: ViewAllocateComponent;
  let fixture: ComponentFixture<ViewAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
