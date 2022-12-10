import { IProfileService, ProfileService, StubProfileService } from 'src/app/Services/Profile.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProfileComponent } from './Profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { httpClientSpy } from 'src/app/Services/HttpClientSpy';
import { routes } from "../../app-routing.module"
import { REST_SERVER_URL } from 'src/app/Services/Configuration';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async() => {

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [FormsModule, HttpClientModule,RouterModule.forRoot(routes)],
      providers: [ ProfileService,
        { provide: HttpClient, useValue: httpClientSpy, },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => "1",},},},},]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct name', () => {
    expect(component.getUserId()).toBe("1")
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="userNameTitle"]')
    expect(aux.textContent).toBe("armando")
  });

});
