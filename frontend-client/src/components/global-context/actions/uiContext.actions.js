import { setPageLoaderKey } from '../../../configs/actionKeys.config';
  
 /**
 * @author Nisal Madusanka (EruliaF)
 * @description set/remove Page loader
 * @param {Function} dispatch 
 * @param {Boolean} status 
 */
const setPageLoader = (dispatch, status) => {
    dispatch({
        type: setPageLoaderKey,
        playload: status,
    });
};

const uiAction = (dispatch) => {
    return {
        setPageLoader: (status) => setPageLoader(dispatch, status),
    };
};

export { uiAction };