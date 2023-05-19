import { getInputsForValidate, mapInputKey } from '../../common.helper';


/**
 * @description validate required fields
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const required = (key, values, param, message, filedList,additionalParam, cb) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue === null || formValue === undefined || formValue === '') {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (required)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};
/**
 * @description validate numeric
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const numeric = (key, values, param, message, filedList,additionalParam, cb) => {
  try {
    const formValue = getInputsForValidate(values, key);

    if (!formValue || isFinite(Number(formValue))) {
      cb(null, true);
    } else {
      let newMessage = message;
      newMessage = newMessage.replace(':min', param);
      cb(newMessage);
    }

  } catch (ex) {
    console.log(
      `----------------Validation Exception At (numeric)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

const regex = (key, values, param, message, filedList,additionalParam, cb) => {
  try {
    let formValue = getInputsForValidate(values, key);
    if(!param[0] || !formValue) {
      cb(null, true);
    } else {
        const regex = new RegExp(param[0]);
        if ( formValue.match(regex) ) {
          cb(null, true);
        } else {
          cb(message);
        }
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (regex)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );
    cb(true);
  }
}

/**
 * @description validate min
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const min = (key, values, param, message, filedList,additionalParam, cb) => {
  try {
      const formValue = getInputsForValidate(values, key);
      if (formValue && formValue.length < param) {
          let newMessage = message;
          newMessage = newMessage.replace(':min', param);
          cb(newMessage);
      } else {
          cb(null, true)
      }

  } catch (ex) {
      console.log(
          `----------------Validation Exception At (min)-------------------`,
          `Input Key - ${key}`,
          `Exception - ${ex}`
      );

      cb(true);
  }
}


/**
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const max = (key, values, param, message, filedList,additionalParam, cb) => {
  try {
      const formValue = getInputsForValidate(values, key);
      if (formValue && formValue.length > param) {
          let newMessage = message;
          newMessage = newMessage.replace(':max', param);
          cb(newMessage);
      } else {
          cb(null, true)
      }

  } catch (ex) {
      console.log(
          `----------------Validation Exception At (max)-------------------`,
          `Input Key - ${key}`,
          `Exception - ${ex}`
      );

      cb(true);
  }
}



export { required,numeric,regex,min,max };