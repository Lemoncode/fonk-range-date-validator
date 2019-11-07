import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'RANGE_DATE';

export interface CustomArgs {
  min: Limit;
  max: Limit;
  parseStringToDateFn?: (value: string) => Date;
}

export interface Limit {
  value: Date;
  inclusive?: boolean;
}

let defaultCustomArgs: CustomArgs = {
  min: {
    value: null,
    inclusive: false,
  },
  max: {
    value: null,
    inclusive: false,
  },
  parseStringToDateFn: null,
};

export const setCustomArgs = (customArgs: Partial<CustomArgs>) => {
  defaultCustomArgs = { ...defaultCustomArgs, ...customArgs };
};

const MISSING_ARGS =
  'FieldValidationError: min and max custom args are mandatory. Example: { customArgs: { min: { value: new Date() }, max: { value: new Date() } } }.';

const MISSING_PARSE_ARGS =
  'FieldValidationError: parseStringToDateFn custom arg is mandatory when value is string. Example: { customArgs: { parseStringToDateFn: (value) => new Date(value) } }.';

let defaultMessage = "Date isn't included in provided range";
export const setErrorMessage = message => (defaultMessage = message);

const isDefined = value => value !== void 0 && value !== null && value !== '';

const isString = value => typeof value === 'string';

const parseToDate = (value, { parseStringToDateFn }: CustomArgs) => {
  if (!parseStringToDateFn) {
    throw new Error(MISSING_PARSE_ARGS);
  }

  return parseStringToDateFn(value);
};

const isValidMin = (value: Date, min: Limit) =>
  min.inclusive ? value >= min.value : value > min.value;

const isValidMax = (value: Date, max: Limit) =>
  max.inclusive ? value <= max.value : value < max.value;

const isValid = (value: Date, customArgs: CustomArgs) =>
  isValidMin(value, customArgs.min) && isValidMax(value, customArgs.max);

const hasCustomArgs = (customArgs: CustomArgs) =>
  customArgs &&
  customArgs.min &&
  customArgs.min.value &&
  customArgs.max &&
  customArgs.max.value;

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs = defaultCustomArgs,
}) => {
  const args: CustomArgs = {
    ...defaultCustomArgs,
    ...customArgs,
  };

  if (!hasCustomArgs(args)) {
    throw new Error(MISSING_ARGS);
  }

  const valueAsDate = isString(value) ? parseToDate(value, args) : value;

  const succeeded = !isDefined(value) || isValid(valueAsDate, args);

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(message as string, args),
    type: VALIDATOR_TYPE,
  };
};
