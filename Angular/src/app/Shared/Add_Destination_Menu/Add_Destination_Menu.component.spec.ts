/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_Destination_MenuComponent } from './Add_Destination_Menu.component';
import { HttpClientModule } from '@angular/common/http';

describe('Add_Destination_MenuComponent', () => {
  let component: Add_Destination_MenuComponent;
  let fixture: ComponentFixture<Add_Destination_MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_Destination_MenuComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_Destination_MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
