import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCampeonatoInscripcionComponent } from './modal-campeonato-inscripcion.component';

describe('ModalCampeonatoInscripcionComponent', () => {
  let component: ModalCampeonatoInscripcionComponent;
  let fixture: ComponentFixture<ModalCampeonatoInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCampeonatoInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCampeonatoInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
