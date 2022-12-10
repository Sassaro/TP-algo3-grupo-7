import { Itinerario } from 'src/Dominio/Itinerarios/Itinerarios';
import { FormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScoreComponent } from './Score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;
  let score = 3.14159
  let fullStars = [1,2,3]
  let emptyStars = [1,2]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    component.starsToCreate = fullStars
    component.emptyStars = emptyStars

    component.score = score
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct score', () => {
    const aux = fixture.debugElement.nativeElement.querySelector('[data-testid="totalScore"]')
    
    expect(aux.textContent).toBe("3.1")
  });

  it('should create the right amount of full stars', () => {
      const aux: DebugElement[] = fixture.debugElement.queryAll(By.css(".fullStars"))
      expect(aux.length).toEqual(3)
  })

  it('should create the right amount of empty stars', () => {
    const aux: DebugElement[] = fixture.debugElement.queryAll(By.css(".emptyStars"))
    expect(aux.length).toEqual(2)
})
});
