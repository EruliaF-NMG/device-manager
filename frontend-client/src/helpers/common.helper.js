
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

export {
    getRandomList,
    isEmpty,
    removeItemFromArray
}