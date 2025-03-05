import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMoradiaComponent } from './cadastro-moradia.component';

describe('CadastromoradiaComponent', () => {
  let component: CadastroMoradiaComponent;
  let fixture: ComponentFixture<CadastroMoradiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroMoradiaComponent]
    });
    fixture = TestBed.createComponent(CadastroMoradiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
