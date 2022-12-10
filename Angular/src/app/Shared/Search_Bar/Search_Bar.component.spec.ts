/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Search_BarComponent } from './Search_Bar.component';

describe('Search_BarComponent', () => {
  let component: Search_BarComponent;
  let fixture: ComponentFixture<Search_BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Search_BarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Search_BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
