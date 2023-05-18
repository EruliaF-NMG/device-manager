import { createContext,useReducer } from "react";

import {formAction} from '../actions/formContext.actions';
import {_set} from '../../../helpers/lodash.wrappers';
import {
    initFormGroupKey,removeFormGroupKey,setInputValueChangeKey,
    setComplexInputValueChangeKey,setErrorsKey,mergeFormObjectKey
} from '../../../configs/actionKeys.config';


const initialState={       
   // _updateStatus:false 
}

const FormContext=createContext({});

const uiReducer=(state, action)=>{    
    switch (action.type) {
        case initFormGroupKey:
            return {
                ...state,
                ...action.payload
            };           
        case removeFormGroupKey:
            delete state[action.payload];
            return state; 
        case setInputValueChangeKey:   
            return {
                ...state,
                [action.formGroupKey]:{
                    ...state[action.formGroupKey],
                    [action.inputKey]:action.value,
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"]
                }
            }; 
        case setErrorsKey:
            return {
                ...state,
                [action.formGroupKey]:{
                    ...state[action.formGroupKey],
                    _errors:action.payload,
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"]
                }
            };
        case setComplexInputValueChangeKey:   
            
            return {
                ...state,
                [action.formGroupKey]:{
                    ..._set(state,action.inputStatePath,action.value)[action.formGroupKey],
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"],                    
                }
            };   
        case mergeFormObjectKey:   
            return {
                ...state,
                [action.formGroupKey]:{
                    ...state[action.formGroupKey],
                    ...action.payload,
                    _updateStatus:!state[action.formGroupKey]["_updateStatus"],
                    
                }
            };   
        default:
            return state;
    }
}


const FormContextProvider=({children})=>{
    const [state,dispatch]=useReducer(uiReducer,initialState);
    const dispatchFn=formAction(dispatch);
    return(
        <FormContext.Provider value={[state,dispatchFn]}>
            {children}
        </FormContext.Provider>
    )
}

export {
    FormContext,
    FormContextProvider
}