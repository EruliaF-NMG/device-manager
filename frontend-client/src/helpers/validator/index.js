import RunValidation from './run-validation';

const validate = (formObject) => {
  let validateObject = {
    rules: {},
    fileds: {},
    message: {},
    additionalParam: {},
    formObject,
  };
  return {
    setRules(rules) {
      validateObject = {
        ...validateObject,
        rules:rules,
      };
      return this;
    },
    setFields(fileds) {
      validateObject = {
        ...validateObject,
        fileds:fileds,
      };
      return this;
    },
    setMessage(message) {
      validateObject = {
        ...validateObject,
        message:message,
      };
      return this;
    },
    setAdditionalParam(additionalParam) {
      validateObject = {
        ...validateObject,
        additionalParam:additionalParam,
      };
      return this;
    },
    run(cb) {
      const validateObj = new RunValidation(validateObject);
      return validateObj.validate(cb);
    },
  };
};

export default validate;