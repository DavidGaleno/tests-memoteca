import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ListarPensamentoComponent } from './listar-pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { Pensamento } from '../pensamento';

describe('ListarPensamentoComponent', () => {
  let component: ListarPensamentoComponent;
  let fixture: ComponentFixture<ListarPensamentoComponent>;
  let service: PensamentoService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
    }).compileComponents();

    service = TestBed.inject(PensamentoService);
    fixture = TestBed.createComponent(ListarPensamentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`(D) ListarPensamentosComponent.listarPensamentos should render Pensamentos when it returns an array of Pensamentos`, () => {
    const response = [
      {
        id: 1,
        conteudo: 'We are the champions my friends!!!',
        autoria: 'Queen',
        modelo: 'modelo1',
      },
      {
        id: 2,
        conteudo: 'Na minha máquina funciona!',
        autoria: 'Dev da madrugada',
        modelo: 'modelo2',
      },
      {
        id: 3,
        conteudo: 'Continue a codar... continue a codar...',
        autoria: 'Dory programadora',
        modelo: 'modelo3',
      },
      {
        conteudo: 'Testando função de editar',
        autoria: 'Angular ',
        modelo: 'modelo2',
        id: 4,
      },
    ];
    const spy = spyOn(service, 'listar').and.returnValue(of(response));
    fixture.detectChanges();
    const pensamentosList =
      fixture.nativeElement.querySelectorAll('.pensamento');
    expect(spy).toHaveBeenCalled();
    expect(pensamentosList.length).toBeGreaterThan(0);
  });
  it(`(D) ListarPensamentosComponent.listarPensamentos should render 'Ainda não há pensamentos cadastrados!' when it returns an empty array`, () => {
    const response: Pensamento[] = [];
    const spy = spyOn(service, 'listar').and.returnValue(of(response));
    fixture.detectChanges();
    const message: HTMLDivElement =
      fixture.nativeElement.querySelector('.sem-pensamentos');
    expect(spy).toHaveBeenCalled();
    expect(message.innerText).toBe('Ainda não há pensamentos cadastrados!');
  });
});
