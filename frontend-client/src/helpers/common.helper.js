import { _get } from "./lodash.wrappers";

/**
 * Check value is empty
 * @param {Any} value 
 * @returns {boolean}
 */
const isEmpty = (value) => {
    if(value === null || value === undefined ) return true;
    return false;
}


/**
 * remove element form array
 * @param {Array} array 
 * @param {Any} value 
 * @returns {Array}
 */
const removeItemFromArray = ([...array],value) => {
    const index = array.indexOf(value);
    if (index !== -1) array.splice(index, 1);
    return array;
}

/**
 * @author Nisal Madusanka(EruliaF)
 * @description get from inputs for form validation
 * @param {Object|Array} formValue form data list
 * @param {string} key form value key
 */
const getInputsForValidate = (formValue, key) => {
    let value = _get(formValue, key, '');
  
    switch (typeof value) {
      case 'string': {
        value = value.trim();
        break;
      }
      default: {
        break;
      }
    }
    return value;
};

/**
* @author Nisal Madusanka(EruliaF)
* @description genarate map key for form validation
* @param {string} realInputKey known key
* @param {string} keyToMap key should find
*/
const mapInputKey = (realInputKey, keyToMap) => {
    const arrayMatch = realInputKey.match(/(\.\d*\.)/g);
    let key = 0;
    const returnData = keyToMap.replace(/(\.\**\.)/g, () => {
      const value = arrayMatch[key];
      key += 1;
      return value;
    });
    return returnData;
};


/**
 * @description date object to string
 * @param {Object|String} dateObject Date object
 * @param {String} format date format
 */
const dateToString = (date, format = 'yyyy-mm-dd') => {
  const dateObject = new Date(date);
  switch (format) {
    case 'yyyy-mm-dd':
      return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
    case 'yyyy_mm_dd':
      return `${dateObject.getFullYear()}_${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, '0')}_${dateObject.getDate().toString().padStart(2, '0')}`;
    case 'h:i a':
      // eslint-disable-next-line no-case-declarations
      let hours = dateObject.getHours();
      // eslint-disable-next-line no-case-declarations
      const minutes = dateObject.getMinutes();
      // eslint-disable-next-line no-case-declarations
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12;
      return `${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    default:
      return date;
  }
};


export {
    isEmpty,
    removeItemFromArray,
    getInputsForValidate,
    mapInputKey,
    dateToString
}