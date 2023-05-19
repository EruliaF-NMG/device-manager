import {
    initFormGroupKey,removeFormGroupKey,setInputValueChangeKey,
    setErrorsKey,mergeFormObjectKey
 } from "../../../configs/actionKeys.config";

/**
 * @author Nisal Madusanka (EruliaF)
 * @description init from group
 * @param {Object} dispatch
 * @param {Object} object 
 */
const initFrom=(dispatch,object)=>{
    dispatch({
        type:initFormGroupKey,
        payload:object
    });
};

/**
 * @author Nisal Madusanka (EruliaF)
 * @description generate form group object
 * @param {*} dispatch 
 * @param {*} formGroupKey 
 */
const initFromObject=(dispatch,formGroupKey,isLoad=false,formObject={},error=[])=>{   
    const attributes = {
        _formGroupKey:formGroupKey,
        _updateStatus:false,
        _onLoad:isLoad,
        _errors:error,
        ...formObject,
    };
    return initFrom(dispatch,{
        [formGroupKey]:attributes
    })
};

/**
 * @author Nisal Madusanka (EruliaF)
 * @description remove form group
 * @param {*} dispatch 
 * @param {*} formGroupKey 
 */
const removeFromGroup=(dispatch,formGroupKey)=>{
    dispatch({
        type:removeFormGroupKey,
        payload:formGroupKey
    });
} 


/**
 * @author Nisal Madusanka (EruliaF)
 * @description set form error
 * @param {*} dispatch 
 * @param {*} formGroupKey 
 * @param {*} errors 
 */
const setFormError=(dispatch,formGroupKey,errors)=>{
    dispatch({
        type:setErrorsKey,
        formGroupKey:formGroupKey,
        payload:errors
    });
} 

/**
 * @author Nisal Madusanka (EruliaF)
 * @description set form input change
 * @param {String} formGroupKey 
 * @param {String} inputKey 
 * @param {String} inputStatePath 
 * @param {String|Integer|Object|Array} value 
 */
const changeInput=(dispatch,formGroupKey,inputKey,value)=>{
    dispatch({
        type:setInputValueChangeKey,
        formGroupKey:formGroupKey,
        inputKey:inputKey,
        value:value
    });
}


const mergeFormObject=(dispatch,formGroupKey,data)=>{
    dispatch({
        type:mergeFormObjectKey,
        formGroupKey:formGroupKey,
        payload:data
    }); 
}



 /**
 * @author Nisal Madusanka (EruliaF)
 * @description connect all methods as one
 * @param {Object} dispatch 
 */
const formAction=(dispatch)=>{
    return {    
        initFrom:(object)=>initFrom(dispatch,object), 
        initFromObject:(formGroupKey,isLoad,formObject,error)=>initFromObject(dispatch,formGroupKey,isLoad,formObject,error),  
        removeFromGroup:(formGroupKey)=>removeFromGroup(dispatch,formGroupKey),
        changeInput:(formGroupKey,inputKey,value)=>changeInput(dispatch,formGroupKey,inputKey,value),
        setFormError:(formGroupKey,errors)=>setFormError(dispatch,formGroupKey,errors),
        mergeFormObject:(formGroupKey,data)=>mergeFormObject(dispatch,formGroupKey,data)
    }
}

export {
    formAction
}