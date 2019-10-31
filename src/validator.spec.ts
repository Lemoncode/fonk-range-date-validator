import { setErrorMessage, validator } from './validator';
describe('fonk-range-date-validator specs', () => {
  it('should return succeeded validation when value is a valid Date object between customArgs startDate and endDate range', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 0);
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object between customArgs startDate and endDate range by one millisecond', () => {
    const value = new Date(2018, 11, 24, 10, 33, 30, 1);
    const startDate = new Date(2018, 11, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 11, 24, 10, 33, 30, 2);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year later than customArgs date param', () => {
    const value = new Date(2018);
    const startDate = new Date(2017);
    const endDate = new Date(2020);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year and month later than customArgs date param', () => {
    const value = new Date(2018, 6);
    const startDate = new Date(2018, 4);
    const endDate = new Date(2018, 12);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month and days later than customArgs date param', () => {
    const value = new Date(2018, 11, 15);
    const startDate = new Date(2018, 11, 5);
    const endDate = new Date(2018, 11, 45);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month, days and hours later than customArgs date param', () => {
    const value = new Date(2018, 11, 30, 18);
    const startDate = new Date(2018, 11, 30, 6);
    const endDate = new Date(2018, 11, 30, 28);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month, days, hours and minutes later than customArgs date param', () => {
    const value = new Date(2018, 12, 24, 10, 45);
    const startDate = new Date(2018, 12, 24, 10, 28);
    const endDate = new Date(2018, 12, 24, 10, 55);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return succeeded validation when value is a valid Date object year, month, days, hours, minutes and seconds later than customArgs date param', () => {
    const value = new Date(2018, 12, 30, 15, 33, 40);
    const startDate = new Date(2018, 12, 30, 15, 33, 30);
    const endDate = new Date(2018, 12, 30, 15, 33, 50);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: 'RANGE_DATE',
    });
  });

  it('should return failed validation when value is a valid Date object later than startDate endDate range', () => {
    const value = new Date(2018, 12, 9, 15, 24, 55, 0);
    const startDate = new Date(2018, 10, 13, 22, 21, 30, 0);
    const endDate = new Date(2018, 11, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: false,
      message: "Date isn't included in provided range",
      type: 'RANGE_DATE',
    });
  });

  it('should return failed validation when value is a valid Date object earlier than startDate and endDate range', () => {
    const value = new Date(2017, 5, 9, 15, 24, 55, 0);
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 11, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: false,
      message: "Date isn't included in provided range",
      type: 'RANGE_DATE',
    });
  });

  it('should throw an error when it feeds value equals undefined', () => {
    const value = undefined;
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const validatorArgs = { value, customArgs: { startDate, endDate } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals null', () => {
    const value = null;
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const validatorArgs = { value, customArgs: { startDate, endDate } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should throw an error when it feeds value equals empty string', () => {
    const value = '';
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const validatorArgs = { value, customArgs: { startDate, endDate } };

    expect(() => validator(validatorArgs)).toThrow(TypeError);
    expect(() => validator(validatorArgs)).toThrowError(
      'Value must be a valid Date object'
    );
  });

  it('should overwrite default message when it feeds value and message', () => {
    const value = new Date(2020, 9, 24, 10, 33, 30, 0);
    const message = 'other message';
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const result = validator({
      value,
      message,
      customArgs: { startDate, endDate },
    });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'RANGE_DATE',
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    const value = new Date(2018, 9, 24, 10, 33, 30, 0);
    setErrorMessage('other message');
    const startDate = new Date(2018, 10, 24, 10, 33, 30, 0);
    const endDate = new Date(2018, 12, 24, 10, 33, 30, 0);

    const result = validator({ value, customArgs: { startDate, endDate } });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: 'RANGE_DATE',
    });
  });

  describe('CustomParams boundaries ', () => {
    it('Should throw an error if customArgs are not provided', () => {
      const value = new Date(2018, 11, 24, 10, 33, 30, 0);
      const validatorArgs = { value };

      expect(() => validator(validatorArgs)).toThrow(Error);
      expect(() => validator(validatorArgs)).toThrowError(
        'FieldValidationError: startDate and endDate options for date validation are mandatory. Example: { startDate: new Date(), endDate: new Date() }.'
      );
    });
  });
});
