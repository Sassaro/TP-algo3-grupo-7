/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResultBarComponent } from './Result-Bar.component';

describe('ResultBarComponent', () => {
  let component: ResultBarComponent;
  let fixture: ComponentFixture<ResultBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
