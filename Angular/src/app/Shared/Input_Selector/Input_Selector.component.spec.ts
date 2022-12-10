/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Input_SelectorComponent } from './Input_Selector.component';

describe('Input_SelectorComponent', () => {
  let component: Input_SelectorComponent;
  let fixture: ComponentFixture<Input_SelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Input_SelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Input_SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
