import { compute } from './compute';

describe(`${compute.name}`, () => {
  it('should return 0 when a negative number is given', () => {
    const givenNumber = -1
    const result = compute(givenNumber);
    expect(result).toBe(0);
  });
  it('should return the given number + 1 when a positive number is given', () => {
    const givenNumber = 0
    const result = compute(givenNumber);
    expect(result).toBe(givenNumber + 1);
  });
});
