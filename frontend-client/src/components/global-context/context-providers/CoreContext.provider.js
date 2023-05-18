import { createContext, useReducer,useContext } from 'react';

import { _get } from '../../../helpers/lodash.wrappers';
import { coreAction } from '../actions/coreContext.actions';
import {
    initApiResponseKey,
    setApiResponseKey,
    setApiResponseErrorKey,
    setApiResponseLoadingStatusKey,
    initDataTableKey,
    setDataTableDataKey,
    reLoadDataTableDataKey,
} from '../../../configs/actionKeys.config';
import { UIContext } from '../context-providers/UIContext.provider';
import { FormContext } from '../context-providers/FormContext.provider';

const initialState = {
    apiResponses: {},
    dataTableResponses: {},
};

const CoreContext = createContext({});

/**
 * core reducer 
 * @param {Object} state 
 * @param {Object} action 
 * @returns 
 */
const coreReducer = (state, action) => {
    switch (action.type) {
        case initApiResponseKey:
            return {
                ...state,
                apiResponses: {
                    ...state.apiResponses,
                    [action.stateKey]: {
                        result: null,
                        isError:false,
                        isLoading:true,
                        _updateStatus: true,
                    }
                }
            }
        case setApiResponseKey:
            return {
                ...state,
                apiResponses: {
                    ...state.apiResponses,
                    [action.stateKey]: {
                        ..._get(state,`apiResponses.${action.stateKey}`,{}),
                        ...action.payload,
                        _updateStatus: !_get(state,`apiResponses.${action.stateKey}._updateStatus`,false),
                    }
                }
            }
        case setApiResponseErrorKey:   
            return {
                ...state,
                apiResponses: {
                    ...state.apiResponses,
                    [action.stateKey]: {
                        ..._get(state,`apiResponses.${action.stateKey}`,{}),
                        ...action.payload,
                        _updateStatus: !_get(state,`apiResponses.${action.stateKey}._updateStatus`,false),
                    }
                }
            }  
        case setApiResponseLoadingStatusKey:            
            return {
                ...state,
                apiResponses: {
                    ...state.apiResponses,
                    [action.stateKey]: {
                        ..._get(state,`apiResponses.${action.stateKey}`,{}),
                        isLoading:action.payload,
                        _updateStatus: !_get(state,`apiResponses.${action.stateKey}._updateStatus`,false),
                    }
                }
            }
        case initDataTableKey:
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        "fetching": 'init',
                        "current_page": 1,
                        "page_count": null,
                        "per_page": 10,
                        "page_size":10,
                        "total": null,
                        "results": [],
                        "shortBy": {},
                        "_updateStatus": false
                    }
                }
            };
        case setDataTableDataKey:            
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ..._get(state, `dataTableResponses.${action.stateKey}`, {}),
                        "fetching": _get(action, 'fetching', 'done'),
                        "current_page": _get(action, 'current_page', 1),
                        "per_page": _get(action, 'per_page', 10),
                        "page_size": _get(action, 'page_size', 10),
                        "page_count": _get(action, 'page_count', 1),
                        "total": _get(action, 'total', null),
                        "results": _get(action, 'results', []),
                        "_updateStatus": !_get(state, `dataTableResponses.${action.stateKey}._updateStatus`, false)
                    }
                }
            }
        case reLoadDataTableDataKey:
            return {
                ...state,
                dataTableResponses: {
                    ...state.dataTableResponses,
                    [action.stateKey]: {
                        ...state.dataTableResponses[action.stateKey],
                        _reloadDataTable: !_get(state, `dataTableResponses.${action.stateKey}._reloadDataTable`, false),
                        _updateStatus: !state.dataTableResponses[action.stateKey]["_updateStatus"]
                    }
                },
            }
        default:
            return state;
    }
}

const CoreContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(coreReducer, initialState);
    const [, uiDispatch] = useContext(UIContext);
    const [, formAction] = useContext(FormContext);
    const dispatchFunction = coreAction(dispatch,uiDispatch,formAction);
    return (
        <CoreContext.Provider value={[state, dispatchFunction]}>
            {children}
        </CoreContext.Provider>
    )
}

export {
    CoreContext,
    CoreContextProvider,
}