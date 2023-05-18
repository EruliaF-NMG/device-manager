import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';

/**
 * Lodash get() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */
const _get = (object, path, defaultValue) => {
    return lodashGet(object, path, defaultValue);
};

/**
 * Lodash set() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */
const _set = (object, path, defaultValue) => {
    return lodashSet(object, path, defaultValue);
};


export {
    _get,
    _set
}