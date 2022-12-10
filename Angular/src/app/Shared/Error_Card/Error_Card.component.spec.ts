/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Error_CardComponent } from './Error_Card.component';

describe('Error_CardComponent', () => {
  let component: Error_CardComponent;
  let fixture: ComponentFixture<Error_CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Error_CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error_CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
