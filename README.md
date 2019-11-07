# fonk-range-date-validator

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-range-date-validator/master?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-range-date-validator/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-range-date-validator?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-range-date-validator)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-range-date-validator)](https://bundlephobia.com/result?p=@lemoncode/fonk-range-date-validator)

This is a [fonk](https://github.com/Lemoncode/fonk) microlibrary that brings validation capabilities to:

- Validate if a field of a form is between a date range.

How to install it:

```bash
npm install @lemoncode/fonk-range-date-validator --save
```

How to add it to an existing form validation schema:

We have the following form model:

```javascript
const myFormValues = {
  product: 'shoes',
  purchaseDate: new Date('2019-03-10'),
};
```

The validator must be configured with the following required arguments:

```javascript
export interface CustomArgs {
  min: Limit;
  max: Limit;
  parseStringToDateFn?: (value: string) => Date;
}

export interface Limit {
  value: Date;
  inclusive?: boolean;
}

```

These are the default arguments:

```javascript
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

```

We can add a rangeDate validation to the myFormValues

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: rangeDate.validator,
        customArgs: {
          min: {
            value: new Date('2019-01-15'),
          },
          max: {
            value: new Date('2019-04-15'),
          },
        },
      },
    ],
  },
};
```

You can customize the error message displayed in two ways:

- Globally, replace the default error message in all validationSchemas (e.g. porting to spanish):

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

rangeDate.setErrorMessage('El campo debe de ser numérico');
```

- Locally just override the error message for this validationSchema:

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: rangeDate.validator,
        message: 'Error message only updated for the validation schema',
        customArgs: {
          min: {
            value: new Date('2019-01-15'),
          },
          max: {
            value: new Date('2019-04-15'),
          },
        },
      },
    ],
  },
};
```

This validator compare [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date) values. If your model use dates as string format, you can provide the `parseStringToDateFn` method.

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: rangeDate.validator,
        customArgs: {
          min: {
            value: new Date('2019-01-15'),
          },
          max: {
            value: new Date('2019-04-15'),
          },
          parseStringToDateFn: value => new Date(value),
        },
      },
    ],
  },
};
```

Or if you are using some third party library like _moment_, _date-fns_, etc:

```diff
import { rangeDate } from '@lemoncode/fonk-range-date-validator';
+ import parse from 'date-fns/parse'

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: rangeDate.validator,
        customArgs: {
          min: {
            value: new Date('2019-01-15'),
          },
          max: {
            value: new Date('2019-04-15'),
          },
-         parseStringToDateFn: value => new Date(value),
+         parseStringToDateFn: value => parse(value, 'yyyy-MM-dd HH:mm:ss', new Date()),
        },
      },
    ],
  },
};
```

You can specify the custom arguments in two ways:

- Locally just customize the arguments for this validationSchema:

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

const validationSchema = {
  field: {
    purchaseDate: [
      {
        validator: rangeDate.validator,
        customArgs: {
          min: {
            value: new Date('2019-01-15'),
          },
          max: {
            value: new Date('2019-04-15'),
          },
          parseStringToDateFn: value => new Date(value),
        },
      },
    ],
  },
};
```

- Globally, replace the default custom arguments in all validationSchemas:

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

rangeDate.setCustomArgs({ parseStringToDateFn: (value) => new Date(value) ) });

// OR

rangeDate.setCustomArgs({ min: { value: new Date(), inclusive: true }});

// OR

rangeDate.setCustomArgs({ max: { value: new Date(), inclusive: true }});

// OR

rangeDate.setCustomArgs({
  min: { value: new Date(), inclusive: true },
  max: { value: new Date(), inclusive: true },
  parseStringToDateFn: value => new Date(value),
});

```

Please, refer to [fonk](https://github.com/Lemoncode/fonk) to know more.

## License

[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
