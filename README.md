# fonk-range-date-validator

[![CircleCI](https://badgen.net/github/status/Lemoncode/fonk-range-date-validator/master?icon=circleci&label=circleci)](https://circleci.com/gh/Lemoncode/fonk-range-date-validator/tree/master)
[![NPM Version](https://badgen.net/npm/v/@lemoncode/fonk-range-date-validator?icon=npm&label=npm)](https://www.npmjs.com/package/@lemoncode/fonk-range-date-validator)
[![bundle-size](https://badgen.net/bundlephobia/min/@lemoncode/fonk-range-date-validator)](https://bundlephobia.com/result?p=@lemoncode/fonk-range-date-validator)

This is a [fonk](https://github.com/Lemoncode/fonk) microlibrary that brings validation capabilities to:

// TODO: Update description and example.

- Validate if a field of a form ....

How to add it to an existing form validation schema:

We have the following form model:

```
const myFormValues = {
  product : 'shoes',
  price: 20,
}
```

We can add a rangeDate validation to the myFormValues

```javascript
import { rangeDate } from '@lemoncode/fonk-range-date-validator';

const validationSchema = {
  price: [rangeDate.validator],
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
  price: [
    {
      validator: rangeDate.validator,
      message: 'Error message only updated for the validation schema',
    },
  ],
};
```

Please, refer to [fonk](https://github.com/Lemoncode/fonk) to know more.

## License

[MIT](./LICENSE)

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
