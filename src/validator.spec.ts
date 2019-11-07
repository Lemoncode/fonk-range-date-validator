import { setErrorMessage, validator, CustomArgs } from './validator';

const VALIDATOR_TYPE = 'RANGE_DATE';
const VALIDATOR_MESSAGE = "Date isn't included in provided range";

describe('fonk-range-date-validator specs', () => {
  it('should return succeeded validation when value is a valid Date object between customArgs min and max range', () => {
    const value = new Date('2018-11-24 10:33:30:000');
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30:000'),
      },
      max: {
        value: new Date('2018-12-24 10:33:30:000'),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object between customArgs min and max range by one millisecond', () => {
    const value = new Date('2018-11-24 10:33:30:001');
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-11-24 10:33:30:000'),
      },
      max: {
        value: new Date('2018-11-24 10:33:30:002'),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object with year later than customArgs date param', () => {
    const value = new Date(2018);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2017),
      },
      max: {
        value: new Date(2020),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object with year and month later than customArgs date param', () => {
    const value = new Date(2018, 6);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 4),
      },
      max: {
        value: new Date(2018, 12),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month and days later than customArgs date param', () => {
    const value = new Date(2018, 11, 15);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 11, 5),
      },
      max: {
        value: new Date(2018, 11, 45),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month, days and hours later than customArgs date param', () => {
    const value = new Date(2018, 11, 30, 18);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 11, 30, 6),
      },
      max: {
        value: new Date(2018, 11, 30, 28),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object with year, month, days, hours and minutes later than customArgs date param', () => {
    const value = new Date(2018, 12, 24, 10, 45);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 12, 24, 10, 28),
      },
      max: {
        value: new Date(2018, 12, 24, 10, 55),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when value is a valid Date object year, month, days, hours, minutes and seconds later than customArgs date param', () => {
    const value = new Date(2018, 12, 30, 15, 33, 40);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 12, 30, 15, 33, 30),
      },
      max: {
        value: new Date(2018, 12, 30, 15, 33, 50),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object later than min max range', () => {
    const value = new Date(2018, 10, 9, 15, 24, 55, 0);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 8, 13, 22, 21, 30, 0),
      },
      max: {
        value: new Date(2018, 9, 24, 10, 33, 30, 0),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object earlier than min and max range', () => {
    const value = new Date(2017, 5, 9, 15, 24, 55, 0);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 10, 24, 10, 33, 30, 0),
      },
      max: {
        value: new Date(2018, 11, 24, 10, 33, 30, 0),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object with year not in min and max range', () => {
    const value = new Date(2025);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2017),
      },
      max: {
        value: new Date(2020),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object with year and month not in min and max range', () => {
    const value = new Date(2018, 2);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 4),
      },
      max: {
        value: new Date(2018, 11),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object with year, month and days not in min and max range', () => {
    const value = new Date(2018, 11, 26);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 11, 5),
      },
      max: {
        value: new Date(2018, 11, 23),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object with year, month, days and hours not in min and max range', () => {
    const value = new Date(2018, 11, 30, 2);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 11, 30, 6),
      },
      max: {
        value: new Date(2018, 11, 30, 28),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object with year, month, days, hours and minutes not in min and max range', () => {
    const value = new Date(2018, 12, 24, 10, 50);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 12, 24, 10, 28),
      },
      max: {
        value: new Date(2018, 12, 24, 10, 45),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when value is a valid Date object year, month, days, hours, minutes and seconds not in min and max range', () => {
    const value = new Date(2018, 12, 30, 15, 33, 10);
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 12, 30, 15, 33, 30),
      },
      max: {
        value: new Date(2018, 12, 30, 15, 33, 50),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals undefined', () => {
    const value = undefined;
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 10, 24, 10, 33, 30, 0),
      },
      max: {
        value: new Date(2018, 11, 24, 10, 33, 30, 0),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals null', () => {
    const value = null;
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 10, 24, 10, 33, 30, 0),
      },
      max: {
        value: new Date(2018, 11, 24, 10, 33, 30, 0),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeeded validation when it feeds value equals empty string', () => {
    const value = '';
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 10, 24, 10, 33, 30, 0),
      },
      max: {
        value: new Date(2018, 11, 24, 10, 33, 30, 0),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value equals string with letters and numbers', () => {
    const value = 'test1234';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value equals string with invalid format date', () => {
    const value = '14:00:00 30-11-2018';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds value equals string with valid format date and is not in range date', () => {
    const value = '2018-09-30 16:00:00';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return succeded validation when it feeds value equals string with valid format date and is in range date', () => {
    const value = '2018-11-01 14:00:00';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds inclusive equals false, value equals string with valid format date and is same date as min value', () => {
    const value = '2018-10-24 10:33:30';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
        inclusive: false,
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds inclusive equals true, value equals string with valid format date and is same date as min value', () => {
    const value = '2018-10-24 10:33:30';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
        inclusive: true,
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds inclusive equals false, value equals string with valid format date and is same date as max value', () => {
    const value = '2018-11-24 10:33:30';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
        inclusive: false,
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
        inclusive: false,
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: VALIDATOR_MESSAGE,
      type: VALIDATOR_TYPE,
    });
  });

  it('should return failed validation when it feeds inclusive equals true, value equals string with valid format date and is same date as max value', () => {
    const value = '2018-11-24 10:33:30';
    const customArgs: CustomArgs = {
      min: {
        value: new Date('2018-10-24 10:33:30'),
        inclusive: false,
      },
      max: {
        value: new Date('2018-11-24 10:33:30'),
        inclusive: true,
      },
      parseStringToDateFn: (value: string) => new Date(value),
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: true,
      message: '',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and message', () => {
    const value = new Date(2020, 9, 24, 10, 33, 30, 0);
    const message = 'other message';
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 10, 24, 10, 33, 30, 0),
      },
      max: {
        value: new Date(2018, 11, 24, 10, 33, 30, 0),
      },
    };

    const result = validator({ value, message, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  it('should overwrite default message when it feeds value and calls to setErrorMessage', () => {
    const value = new Date(2018, 9, 24, 10, 33, 30, 0);
    setErrorMessage('other message');
    const customArgs: CustomArgs = {
      min: {
        value: new Date(2018, 10, 24, 10, 33, 30, 0),
      },
      max: {
        value: new Date(2018, 11, 24, 10, 33, 30, 0),
      },
    };

    const result = validator({ value, customArgs });

    expect(result).toEqual({
      succeeded: false,
      message: 'other message',
      type: VALIDATOR_TYPE,
    });
  });

  describe('CustomParams boundaries ', () => {
    it('Should throw an error if customArgs are not provided', () => {
      const value = new Date(2018, 11, 24, 10, 33, 30, 0);

      expect(() => validator({ value })).toThrow(Error);
      expect(() => validator({ value })).toThrowError(
        'FieldValidationError: min and max custom args are mandatory. Example: { customArgs: { min: { value: new Date() }, max: { value: new Date() } } }.'
      );
    });

    it('Should throw an error if customArgs.date is not provided', () => {
      const value = new Date(2018, 11, 24, 10, 33, 30, 0);
      const customArgs: CustomArgs = {
        min: null,
        max: null,
      };

      expect(() => validator({ value, customArgs })).toThrow(Error);
      expect(() => validator({ value, customArgs })).toThrowError(
        'FieldValidationError: min and max custom args are mandatory. Example: { customArgs: { min: { value: new Date() }, max: { value: new Date() } } }.'
      );
    });

    it('Should throw an error if value is string and customArgs.parseStringToDateFn is not provided', () => {
      const value = '2019-11-06';
      const customArgs: CustomArgs = {
        min: {
          value: new Date(),
        },
        max: {
          value: new Date(),
        },
        parseStringToDateFn: void 0,
      };

      expect(() =>
        validator({
          value,
          customArgs,
        })
      ).toThrow(Error);
      expect(() =>
        validator({
          value,
          customArgs,
        })
      ).toThrowError(
        'FieldValidationError: parseStringToDateFn custom arg is mandatory when value is string. Example: { customArgs: { parseStringToDateFn: (value) => new Date(value) } }.'
      );
    });
  });
});
