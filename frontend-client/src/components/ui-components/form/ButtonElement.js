import { useContext } from 'react';
import { Button,notification } from 'antd';
import PropTypes from "prop-types";

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

ButtonElement.propTypes = {    
    type: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    danger: PropTypes.bool,
    styles: PropTypes.string,
    shape: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
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
            openNotification(error,result);
            onClick(error,result);
        });
    }

    const openNotification = (error,result) => {
        if(_get(result,'data.meta.message',null)===null) return;
        notification.open({
          className: error===null ?"!bg-green-100":"!bg-red-100",            
          message: error===null ?"Success":"Failed",
          duration:2,
          description:_get(result,'data.meta.message',"")
        });
    };

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

ButtonElementWithState.propTypes = {    
    type: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
    danger: PropTypes.bool,
    styles: PropTypes.string,
    shape: PropTypes.string,
    size: PropTypes.string,
    apiUrl: PropTypes.string,
    apiMethod: PropTypes.string,
    dataTableKey: PropTypes.string,
    formGroupKey: PropTypes.string,
    formValidateObject: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node,
}

export {
    ButtonElement,
    ButtonElementWithState
}