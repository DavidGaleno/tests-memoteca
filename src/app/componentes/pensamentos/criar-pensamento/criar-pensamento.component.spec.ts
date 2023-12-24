import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CriarPensamentoComponent } from './criar-pensamento.component';
import { PensamentoService } from '../pensamento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Pensamento } from '../pensamento';

describe('CriarPensamentoComponent', () => {
  let component: CriarPensamentoComponent;
  let fixture: ComponentFixture<CriarPensamentoComponent>;
  let service: PensamentoService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(PensamentoService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CriarPensamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`${CriarPensamentoComponent.prototype.criarPensamento.name} should call ${PensamentoService.prototype.criar.name}`, () => {
    const pensamento: Pensamento = {
      conteudo: 'Testando função de editar',
      autoria: 'Angular ',
      modelo: 'modelo2',
      id: 4,
    };
    component.pensamento = pensamento;
    const serviceSpy = spyOn(service, 'criar').and.returnValue(
      of(component.pensamento)
    );
    component.criarPensamento();
    expect(serviceSpy).toHaveBeenCalled();
  });
  it(`${CriarPensamentoComponent.prototype.criarPensamento.name} should navigate to '/listarPensamento'`, () => {
    const pensamento: Pensamento = {
      conteudo: 'Testando função de editar',
      autoria: 'Angular ',
      modelo: 'modelo2',
      id: 4,
    };
    component.pensamento = pensamento;
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(service, 'criar').and.returnValue(of(component.pensamento));
    component.criarPensamento();
    expect(navigateSpy).toHaveBeenCalledWith(['/listarPensamento']);
  });
  it(`${CriarPensamentoComponent.prototype.cancelar.name} should navigate to '/listarPensamento'`, () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.cancelar();
    expect(navigateSpy).toHaveBeenCalledWith(['/listarPensamento']);
  });
  it(`(D) ${CriarPensamentoComponent.prototype.criarPensamento.name} should NOT navigate to '/listarPensamento' when Button with text 'Salvar' is pressed and the form fields is empty `, () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(service, 'criar').and.returnValue(of(component.pensamento));
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.salvar');
    button.click();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
  it(`(D) ${CriarPensamentoComponent.prototype.criarPensamento.name} should navigate to '/listarPensamento' when Button with text 'Salvar' is pressed and the form fields are filled `, () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(service, 'criar').and.returnValue(of(component.pensamento));
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.salvar');
    const pensamentoField: HTMLInputElement =
      fixture.nativeElement.querySelector('#pensamento');
    const autoriaField: HTMLInputElement =
      fixture.nativeElement.querySelector('#autoria');
    pensamentoField.value = 'Teste';
    autoriaField.value = 'Teste';
    pensamentoField.dispatchEvent(new Event('input'));
    autoriaField.dispatchEvent(new Event('input'));
    console.log(component.pensamento);
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/listarPensamento']);
  });
  it(`(D) ${CriarPensamentoComponent.prototype.cancelar.name} should navigate to '/listarPensamento' when Button with text 'Cancelar' is pressed `, () => {
    const navigateSpy = spyOn(router, 'navigate');
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.cancelar');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/listarPensamento']);
  });
});
