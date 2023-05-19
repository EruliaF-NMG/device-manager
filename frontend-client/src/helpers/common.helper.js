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

export {
    isEmpty,
    removeItemFromArray,
    getInputsForValidate,
    mapInputKey,
}