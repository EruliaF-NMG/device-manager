import lodashGet from 'lodash.get';

/**
 * Lodash get() wrapper
 * @param (Object) object
 * @param (Array|string) path
 * @param (*) defaultValue
 */
const _get = (object, path, defaultValue) => {
    return lodashGet(object, path, defaultValue);
};


export {
    _get,
}