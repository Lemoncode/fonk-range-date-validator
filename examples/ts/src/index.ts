import { ValidationSchema, createFormValidation } from '@lemoncode/fonk';

import { rangeDate } from '@lemoncode/fonk-range-date-validator';

const validationSchema: ValidationSchema = {
  field: {
    myField: [
      {
        validator: rangeDate.validator,
        customArgs: {
          startDate: new Date('2019-01-15'),
          endDate: new Date('2019-04-15'),
        },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

Promise.all([
  formValidation.validateField('myField', new Date('2019-08-10')),
  formValidation.validateField('myField', new Date('2019-03-10')),
]).then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
<div style="flex-grow: 1;margin-left:2rem;">
  <h2>Example with failed result:</h2>

<pre>
  formValidation.validateField('myField', new Date('2019-08-10'))
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(failedResult, null, 2)}
</pre>
</div>

<div style="flex-grow: 1;">
  <h2>Example with succeeded result:</h2>

<pre>
formValidation.validateField('myField', new Date('2019-03-10'))
</pre>

  <h3>Result: </h3>
<pre>
${JSON.stringify(succeededResult, null, 2)}
</pre>
</div>
`;
});
