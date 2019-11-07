import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace rangeDate {
  export interface CustomArgs {
    min: Limit;
    max: Limit;
    parseStringToDateFn?: (value: string) => Date;
  }
  export interface Limit {
    value: Date;
    inclusive?: boolean;
  }
  export const validator: FieldValidationFunctionSync<CustomArgs>;
  export function setErrorMessage(message: string | string[]): void;
  export function setCustomArgs(customArgs: Partial<CustomArgs>): void;
}
