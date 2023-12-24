import { greet } from './greet';

describe(greet.name, () => {
  it(`should return a message containing the given name`, () => {
    const name = 'David';
    const resposta = greet(name);
    expect(resposta).toContain(name);
  });
});
