/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Config_DemandingComponent } from './Config_Demanding.component';

describe('Config_DemandingComponent', () => {
  let component: Config_DemandingComponent;
  let fixture: ComponentFixture<Config_DemandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Config_DemandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Config_DemandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
