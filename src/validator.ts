import {
  FieldValidationFunctionSync,
  parseMessageWithCustomArgs,
} from '@lemoncode/fonk';

const VALIDATOR_TYPE = 'RANGE_DATE';

interface CustomArgs {
  startDate: Date;
  endDate: Date;
}

const BAD_PARAMETER = 'Value must be a valid Date object';
const MISSING_ARGS =
  'FieldValidationError: startDate and endDate options for date validation are mandatory. Example: { startDate: new Date(), endDate: new Date() }.';

let defaultMessage = "Date isn't included in provided range";
export const setErrorMessage = message => (defaultMessage = message);

export const validator: FieldValidationFunctionSync<CustomArgs> = ({
  value,
  message = defaultMessage,
  customArgs,
}) => {
  if (!customArgs) {
    throw new Error(MISSING_ARGS);
  }

  const { startDate, endDate } = customArgs;

  if (!(value instanceof Date)) {
    throw new TypeError(BAD_PARAMETER);
  }

  const succeeded = value > startDate && value < endDate;

  return {
    succeeded,
    message: succeeded
      ? ''
      : parseMessageWithCustomArgs(
          (message as string) || defaultMessage,
          customArgs
        ),
    type: VALIDATOR_TYPE,
  };
};
