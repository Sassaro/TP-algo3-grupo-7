/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Friend_ProfileComponent } from './Friend_Profile.component';
import { FormsModule } from '@angular/forms';
import { IProfileService, ProfileService, StubProfileService } from 'src/app/Services/Profile.service';

describe('Friend_ProfileComponent', () => {
  let component: Friend_ProfileComponent;
  let fixture: ComponentFixture<Friend_ProfileComponent>;
  let profileService: IProfileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Friend_ProfileComponent ],
      imports: [FormsModule],
      providers: [ StubProfileService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    profileService = new StubProfileService();
    fixture = TestBed.createComponent(Friend_ProfileComponent);
    component = fixture.componentInstance;
    component.user = profileService.getUser()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct name and surname', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="friendNameSurname"]')
    expect(aux.textContent).toBe("Pepe Barreras")
  });

  it('should have the correct username and countrysurname', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="friendUsernameCountry"]')
    expect(aux.textContent).toBe("Usuario pepBarrera / Argentina")
  });
});
