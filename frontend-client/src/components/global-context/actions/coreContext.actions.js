import {
  initApiResponseKey,
  setApiResponseKey,
  setApiResponseErrorKey,
  setApiResponseLoadingStatusKey,
  initDataTableKey,
  setDataTableDataKey,
  reLoadDataTableDataKey
} from '../../../configs/actionKeys.config';
import { request } from '../../../helpers/axios.wrapper';
import { _get } from '../../../helpers/lodash.wrappers';
import validate from '../../../helpers/validator';
import { emptyFunction } from '../../../configs/defaultProps.config';
import { responseCode,storingType } from '../../../configs/response.config';

/**
 * initialize response object 
 * @param {Function} dispatch 
 * @param {String} stateKey 
 */
const initApiResponse = (dispatch, stateKey) => {
  dispatch({
    type: initApiResponseKey,
    stateKey: stateKey,
  });
};

/**
 * set api response to global state
 * @param {Function} dispatch 
 * @param {String} stateKey 
 * @param {Object} result 
 */
const setApiResponse = (dispatch, stateKey, result) => {
  dispatch({
    type: setApiResponseKey,
    stateKey: stateKey,
    payload: result,
  });
};

/**
 * set error response to global state
 * @param {Function} dispatch 
 * @param {String} stateKey 
 * @param {Object} result 
 */
const setErrorObject = (dispatch, stateKey, result) => {
  dispatch({
    type: setApiResponseErrorKey,
    stateKey: stateKey,
    payload: result,
  });
};

/**
 * set page loading state
 * @param {Function} dispatch 
 * @param {String} stateKey 
 * @param {Boolean} result 
 */
const setResponseLoadingStatus = (dispatch, stateKey, result) => {
  dispatch({
    type: setApiResponseLoadingStatusKey,
    stateKey: stateKey,
    payload: result,
  });
};

/**
 * request api data and update global state
 * @param {Function} dispatch 
 * @param {String} apiUrl 
 * @param {String} apiKey 
 */
const sendAPIRequest = async (dispatch, apiUrl = null,apiKey=null) => {
  initApiResponse(dispatch,apiKey);
  // call api
  
  const result = await request(apiUrl);
  //stop page loading
  setResponseLoadingStatus(dispatch,apiKey,false);

  if(result._status) {
      //set success result
      setApiResponse(dispatch,apiKey,{
          result:result.data
      });
  } else {
      //set error result
      setErrorObject(dispatch,apiKey,{
          isError:true,
          result:null
      });
  }
};

/**
 * initialize data table object 
 * @param {Function} dispatch 
 * @param {String} stateKey 
 */
const initDataTable = (dispatch, stateKey) => {
  dispatch({
    type: initDataTableKey,
    stateKey: stateKey,
  });
};

/**
 * set data to data table object 
 * @param {Function} dispatch 
 * @param {String} stateKey 
 * @param {Array} results 
 * @param {string} fetching 
 * @param {Number} current_page 
 * @param {Number} page_count 
 * @param {Number} per_page 
 * @param {Number} total 
 * @param {Number} page_size 
 */
const setDataTable = (
  dispatch,
  stateKey,
  results = [],
  fetching = 'init',
  current_page = 1,
  page_count = null,
  per_page = 10,
  total = null,
  page_size = 10
) => {
  dispatch({
    type: setDataTableDataKey,
    stateKey: stateKey,
    fetching: fetching,
    current_page: current_page,
    page_count: page_count,
    per_page: per_page,
    total: total,
    results: results,
    page_size: page_size,
  });
};

/**
 * Change reset flag status
 * @param {Function} dispatch 
 * @param {String} stateKey 
 */
const resetDataTable = (dispatch, stateKey) => {
  dispatch({
    type: reLoadDataTableDataKey,
    stateKey: stateKey,
  });
};

/**
 * Send data to api and update global state with api result
 * @param {Function} dispatch 
 * @param {Function} formContext 
 * @param {Function} uiDispatch 
 * @param {Object} apiRequest api request data
 * @param {string} dataTableKey 
 * @param {Object} validationObject form validation related data
 * @param {Function} cb 
 */
const sendToAPI = async ( dispatch, formContext, uiDispatch, apiRequest={},dataTableKey=null,validationObject={}, cb = emptyFunction ) => {

  //set page loader
  if (_get(apiRequest, 'setLoader', false) === true)  uiDispatch.setPageLoader(true);

  try{
    // call api
    const result = await request(_get(apiRequest, 'apiUrl', ''),_get(apiRequest, 'method', 'GET'),_get(apiRequest, 'body', null));

     //remove page loader
    if (_get(apiRequest, 'setLoader', false) === true) uiDispatch.setPageLoader(false);

    //pass data to global state
    if(result._status) {
      switch (_get(apiRequest, 'storingType', storingType.DATA_TABLE)) {
        case storingType.DATA_TABLE:
          setDataTable(
            dispatch,
            dataTableKey,
            _get(result, 'data.data.data', []),
            'done',
            _get(result, 'data.data.current_page', 1),
            _get(result, 'data.data.total_pages', null),
            _get(result, 'data.data.data', []).length,
            _get(result, 'data.data.total_items', null),
            _get(result, 'data.data.page_size	', 10)
          );
          cb(null, result);
          return;
        case storingType.CURD_FORM:
          if (dataTableKey !== null) {
            resetDataTable(
              dispatch,
              dataTableKey
            );
          }

          if (_get(apiRequest, 'apiKey', null) !== null) {
            setApiResponse(
              dispatch,
              _get(apiRequest, 'apiKey', null),
              _get(result, 'data.data', null)
            );
          }

          cb(null, result);
          return;
        default:
            cb(null, result);
            return;
      }
    } else {
      if ( _get(result, 'data.response.data.meta.code', null) === responseCode.VALIDATION_ERROR ) {
        formContext.setFormError(_get(validationObject, 'formKey', ''), _get(result, 'data.response.data.error', []) );
      }
    }
    
  } catch(ex) {
    console.log(ex);
  }
}

/**
 * Validate request before to sending  data to api
 * @param {Function} dispatch 
 * @param {Function} formContext 
 * @param {Function} uiDispatch 
 * @param {Object} apiRequest api request data
 * @param {string} dataTableKey 
 * @param {Object} validationObject form validation related data
 * @param {Function} cb 
 */
const validateANDPassData = (dispatch, formContext, uiDispatch,validationObject=null,apiRequest=null,dataTableKey=null, cb = emptyFunction) => {
  if(_get(validationObject,'rules',null) !== null) {
    validate(_get(validationObject,'formData',{}))
      .setFields(_get(validationObject,'fields',{}))
      .setRules(_get(validationObject,'rules',{}))
      .setMessage(_get(validationObject,'message',{}))
      .run((error, result) => {
          let formKey = _get(validationObject, 'formKey', '');
          if (error) {
            formContext.setFormError(formKey, error);
            cb(error, null);
          } else {
            formContext.setFormError(formKey, []);
            sendToAPI(dispatch, formContext, uiDispatch,apiRequest,dataTableKey,validationObject,cb )
          }
    });
  } else {
    sendToAPI(dispatch, formContext, uiDispatch,apiRequest,dataTableKey,validationObject, cb );
  }
}

/**
 * single entry point to access all action methods
 * @param {Function} dispatch 
 */
const coreAction = (dispatch, uiDispatch,formContext) => {
  return {
    sendAPIRequest: (apiUrl,apiKey) => sendAPIRequest(dispatch, apiUrl,apiKey),
    setErrorObject: (apiKey, result) => setErrorObject(dispatch, apiKey, result),
    setResponseLoadingStatus: (apiKey, result) => setResponseLoadingStatus(dispatch, apiKey, result),
    resetDataTable:(stateKey)=>resetDataTable(dispatch,stateKey),
    validateANDPassData:(validationObject,apiRequest,dataTableKey,cb)=>validateANDPassData(dispatch, formContext, uiDispatch,validationObject,apiRequest,dataTableKey,cb),
    sendToAPI:(apiRequest,dataTableKey,validationObject,cb)=>sendToAPI(dispatch, formContext, uiDispatch,apiRequest,dataTableKey,validationObject,cb)
  };
};

export { coreAction };