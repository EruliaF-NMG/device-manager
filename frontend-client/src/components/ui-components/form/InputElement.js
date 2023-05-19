import { useContext } from 'react';
import { Form, Input } from 'antd';
import { emptyFunction, inputValidateStatus } from '../../../configs/defaultProps.config';
import { FormContext } from '../../global-context/context-providers/FormContext.provider';
import { _get } from '../../../helpers/lodash.wrappers';

const InputElement = ({
    label="",
    name="",
    value="",
    placeholder="",
    helpTest="",
    disabled=false,
    isError=false,
    onChange=emptyFunction,
}) => {
    return (
        <Form.Item
            label={label}
            name={name}
            validateStatus={isError?inputValidateStatus.error:null}
            help={helpTest}
        >
            <Input 
                value={value} 
                disabled={disabled}
                placeholder={placeholder}
                onChange={(event)=>onChange(event.target.value,name)}
            />
        </Form.Item>
    )
}

const InputElementWithState = ({
    label="",
    name="",
    placeholder="",
    helpTest="",
    formGroupKey="",
    disabled=false,
}) => {

    const [ formState, formAction ]= useContext( FormContext );

    const getErrorMessage = () => {
        const errorObject = _get(formState,`${formGroupKey}._errors`,[]).find(item => item.property === name)||{};
        return errorObject.message || "";
    }
    
    return (
        <InputElement
            label={label}
            name={name}
            value={_get(formState,`${formGroupKey}.${name}`,'')}
            placeholder={placeholder}
            helpTest={getErrorMessage()===""?helpTest:getErrorMessage()}
            isError={getErrorMessage()!==""?true:false}
            disabled={disabled}
            onChange={(value)=> formAction.changeInput(formGroupKey,name,value)}
        />
    )
}

export {
    InputElement,
    InputElementWithState
}