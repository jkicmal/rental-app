import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (input) => {
  const errors = {};

  if (validator.isEmpty(input.email)) {
    errors.email = 'This field is required';
  }

  if (!validator.isEmail(input.email)) {
    errors.email = 'This field has to be an email';
  }

  if (validator.isEmpty(input.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateInput as validateLoginInput };
