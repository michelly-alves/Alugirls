import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaMoradiaComponent } from './minha-moradia.component';

describe('MinhaMoradiaComponent', () => {
  let component: MinhaMoradiaComponent;
  let fixture: ComponentFixture<MinhaMoradiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinhaMoradiaComponent]
    });
    fixture = TestBed.createComponent(MinhaMoradiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
