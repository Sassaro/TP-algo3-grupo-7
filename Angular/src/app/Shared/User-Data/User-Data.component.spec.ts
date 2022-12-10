import { IProfileService, ProfileService, StubProfileService } from './../../Services/Profile.service';
import { ProfileComponent } from '../../Pages/Profile/Profile.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDataComponent } from './User-Data.component';
import { FormsModule } from '@angular/forms';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;
  let profileService:IProfileService

  beforeEach(waitForAsync(() => {
    profileService = new StubProfileService()
    TestBed.configureTestingModule({
      declarations: [ UserDataComponent ],
      imports: [FormsModule],
      providers: [ StubProfileService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataComponent);
    component = fixture.componentInstance;
    component.user = profileService.getUser()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct name', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="name"]')
    expect(aux.text).toBe("Pepe")
  });

  it('should show correct username', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="username"]')
    expect(aux.text).toBe("pepBarrera")
  });

  it('should show correct availabeDays', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="availabeDays"]')
    expect(aux.text).toBe(10)
  });

  it('should show correct surname', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="surname"]')
    expect(aux.text).toBe("Barreras")
  });

  it('should show correct country', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="country"]')
    expect(aux.text).toBe("Argentina")
  });
});
