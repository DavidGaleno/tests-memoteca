import { TestBed } from '@angular/core/testing';

import { PensamentoService } from './pensamento.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Pensamento } from './pensamento';

// class PensamentoServiceMock extends PensamentoService {
//   response: Pensamento[] = [
//     {
//       id: 1,
//       conteudo: 'We are the champions my friends!!!',
//       autoria: 'Queen',
//       modelo: 'modelo1',
//     },
//     {
//       id: 2,
//       conteudo: 'Na minha máquina funciona!',
//       autoria: 'Dev da madrugada',
//       modelo: 'modelo2',
//     },
//     {
//       id: 3,
//       conteudo: 'Continue a codar... continue a codar...',
//       autoria: 'Dory programadora',
//       modelo: 'modelo3',
//     },
//     {
//       conteudo: 'Testando função de editar',
//       autoria: 'Angular ',
//       modelo: 'modelo2',
//       id: 4,
//     },
//   ];
//   override listar() {
//     return of(this.response);
//   }
//   override criar(pensamento: Pensamento): Observable<Pensamento> {
//     this.response.push(pensamento);
//     return of(pensamento);
//   }
//   override editar(pensamento: Pensamento): Observable<Pensamento> {
//     const index = this.response.indexOf(pensamento);
//     const pensamentoEditado = { ...pensamento };
//     pensamentoEditado.conteudo = 'teste';
//     this.response[index] = pensamentoEditado;
//     return of(pensamentoEditado);
//   }
//   override excluir(id: number): Observable<Pensamento> {
//     const index = this.response.findIndex((pensamento) => pensamento.id === id);
//     const pensamento = this.response.find((pensamento) => pensamento.id === id);
//     this.response.splice(index, 1);
//     return of(pensamento!);
//   }
// }

describe('PensamentoService', () => {
  let service!: PensamentoService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PensamentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it(`${PensamentoService.prototype.listar.name} should return Pensamentos `, () => {
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
    service.listar().subscribe((pensamentos) => {
      expect(pensamentos).toBe(response);
      expect(pensamentos.length).toBeGreaterThan(0);
    });
    const request = httpTestingController.expectOne(
      'http://localhost:3000/pensamentos'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe('http://localhost:3000/pensamentos');
    request.flush(response);
  });
  it(`${PensamentoService.prototype.criar.name} should create a new Pensamento`, () => {
    const pensamento: Pensamento = {
      autoria: '',
      conteudo: '',
      modelo: 'modelo1',
      id: 5,
    };
    service.criar(pensamento).subscribe((resposta: Pensamento) => {
      expect(resposta).toBe(pensamento);
    });
    const request = httpTestingController.expectOne(
      'http://localhost:3000/pensamentos'
    );
    expect(request.request.method).toBe('POST');
    expect(request.request.url).toBe('http://localhost:3000/pensamentos');
    request.flush(pensamento);
  });
  it(`${PensamentoService.prototype.editar.name} should edit a Pensamento`, () => {
    const pensamento: Pensamento = {
      autoria: '',
      conteudo: '',
      modelo: 'modelo1',
      id: 4,
    };
    service.editar(pensamento).subscribe((resposta: Pensamento) => {
      expect(resposta).toEqual(pensamento);
    });
    const request = httpTestingController.expectOne(
      `http://localhost:3000/pensamentos/${pensamento.id}`
    );
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(
      `http://localhost:3000/pensamentos/${pensamento.id}`
    );
    request.flush(pensamento);
  });
  it(`${PensamentoService.prototype.excluir.name} should delete a Pensamento`, () => {
    const pensamento: Pensamento = {
      autoria: '',
      conteudo: '',
      modelo: 'modelo1',
      id: 4,
    };
    service.excluir(pensamento.id!).subscribe((resposta) => {
      expect(resposta).toBe(pensamento);
    });
    const request = httpTestingController.expectOne(
      `http://localhost:3000/pensamentos/${pensamento.id}`
    );
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(
      `http://localhost:3000/pensamentos/${pensamento.id}`
    );
    request.flush(pensamento);
  });
});
