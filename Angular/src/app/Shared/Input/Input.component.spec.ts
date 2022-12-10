import { FormsModule } from '@angular/forms';
import { IProfileService, ProfileService, StubProfileService } from 'src/app/Services/Profile.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputComponent } from './Input.component';
import { elementAt } from 'rxjs';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let dataService: IProfileService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      providers:[StubProfileService],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    dataService = new StubProfileService()
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.text = dataService.getUser().nombre      //Le asigna el nombre del usuario como binding
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the value inside the input correctly', fakeAsync(() => {
    
    component.text = "Jose"
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      const aux = fixture.debugElement.nativeElement.querySelector("#name")
      expect(aux.value).toBe("Jose")

    })
  }));

});
