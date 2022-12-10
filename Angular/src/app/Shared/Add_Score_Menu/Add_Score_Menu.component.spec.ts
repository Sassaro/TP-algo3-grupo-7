/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_Score_MenuComponent } from './Add_Score_Menu.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('Add_Score_MenuComponent', () => {
  let component: Add_Score_MenuComponent;
  let fixture: ComponentFixture<Add_Score_MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_Score_MenuComponent ],
      imports: [HttpClientModule, RouterModule.forRoot([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_Score_MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
