import { useContext } from 'react';
import { Button } from 'antd';
import { buttonTypes,emptyFunction,buttonShape,buttonSize } from '../../../configs/defaultProps.config';
import { FormContext } from '../../global-context/context-providers/FormContext.provider';
import { CoreContext } from '../../global-context/context-providers/CoreContext.provider';
import { _get } from '../../../helpers/lodash.wrappers';
import { storingType } from '../../../configs/response.config';

const ButtonElement = ({
    type=buttonTypes.primary,
    children=null,
    icon=null,
    disabled=false,
    danger=false,
    styles="",
    shape=buttonShape.default,
    size=buttonSize.middle,
    onClick=emptyFunction
}) =>{
    return (
        <Button 
            icon={icon}
            type={type}
            disabled={disabled}
            className={styles}
            shape={shape}
            size={size}
            danger={danger}
            onClick={()=>onClick()}
        >
            {children}
        </Button>
    );
}

const ButtonElementWithState = ({
    type=buttonTypes.primary,
    children=null,
    icon=null,
    disabled=false,
    danger=false,
    styles="",
    apiUrl="",
    apiMethod="POST",
    dataTableKey="",
    formGroupKey="",
    formValidateObject={},
    shape=buttonShape.default,
    size=buttonSize.middle,
    onClick=emptyFunction
}) =>{

    const [ formState, ]= useContext( FormContext ); 
    const [ , coreAction ]= useContext( CoreContext ); 

    const onBtnClick = () => {
        coreAction.validateANDPassData({
            formData:_get(formState,`${formGroupKey}`,{}),
            formKey:formGroupKey,
            ...formValidateObject
        },
        {
            storingType:storingType.CURD_FORM,
            setLoader:true,
            apiUrl:apiUrl,
            method:apiMethod,
            body:_get(formState,`${formGroupKey}`,{}),
            apiKey:null
        },
        dataTableKey,
        (error,result)=>{
            onClick(error,result);
        });
    }

    return(
        <ButtonElement
            type={type}
            icon={icon}
            disabled={disabled}
            danger={danger}
            styles={styles}
            shape={shape}
            size={size}
            onClick={()=>onBtnClick()}
        >
            {children}
        </ButtonElement>
    );
}


export {
    ButtonElement,
    ButtonElementWithState
}