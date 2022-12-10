/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Car_Brand_SelectorComponent } from './Car_Brand_Selector.component';
import { HttpClientModule } from '@angular/common/http';

describe('Car_Brand_SelectorComponent', () => {
  let component: Car_Brand_SelectorComponent;
  let fixture: ComponentFixture<Car_Brand_SelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Car_Brand_SelectorComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Car_Brand_SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
