import { getCurrencies } from './getCurrencies';

describe(getCurrencies.name, () => {
  it(`should return an array containing 'USD'`, () => {
    const resposta = getCurrencies();
    expect(resposta).toContain('USD');
  });
  it(`should return an array containing 'AUD'`, () => {
    const resposta = getCurrencies();
    expect(resposta).toContain('AUD');
  });
  it(`should return an array containing 'EUR'`, () => {
    const resposta = getCurrencies();
    expect(resposta).toContain('EUR');
  });
});
