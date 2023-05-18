import { setPageLoaderKey } from '../../../configs/actionKeys.config';
  
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