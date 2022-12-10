/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Update_CardComponent } from './Update_Card.component';

describe('Update_CardComponent', () => {
  let component: Update_CardComponent;
  let fixture: ComponentFixture<Update_CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Update_CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Update_CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
