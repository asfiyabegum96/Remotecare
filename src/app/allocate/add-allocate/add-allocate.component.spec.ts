import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllocateComponent } from './add-allocate.component';

describe('AddAllocateComponent', () => {
  let component: AddAllocateComponent;
  let fixture: ComponentFixture<AddAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
