import { useContext } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch,Form } from 'antd';
import PropTypes from "prop-types";

import { emptyFunction, inputValidateStatus } from '../../../configs/defaultProps.config';
import { FormContext } from '../../global-context/context-providers/FormContext.provider';
import { _get } from '../../../helpers/lodash.wrappers';

const SwitchElement = ({
    label="",
    name="",
    helpTest="",
    disabled=false,
    isError=false,
    defaultChecked=false,
    onChange=emptyFunction,
}) =>{
    return (
        <Form.Item
            label={label}
            name={name}
            validateStatus={isError?inputValidateStatus.error:null}
            help={helpTest}
            valuePropName="checked"
        >
        <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={defaultChecked}
            onChange={(status)=>onChange(status,name)}
            disabled={disabled}
        />
        </Form.Item>
    );
}

SwitchElement.propTypes = {    
    label: PropTypes.string,
    name: PropTypes.string,
    helpTest: PropTypes.string,
    disabled: PropTypes.bool,
    isError: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange:PropTypes.func
}

const SwitchElementWithState = ({
    label="",
    name="",
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
        <SwitchElement
            label={label}
            name={name}
            defaultChecked={_get(formState,`${formGroupKey}.${name}`,false)}
            helpTest={getErrorMessage()===""?helpTest:getErrorMessage()}
            isError={getErrorMessage()!==""?true:false}
            disabled={disabled}
            onChange={(value)=> formAction.changeInput(formGroupKey,name,value)}
        />
    )
}

SwitchElementWithState.propTypes = {    
    label: PropTypes.string,
    name: PropTypes.string,
    helpTest: PropTypes.string,
    formGroupKey: PropTypes.string,
    disabled: PropTypes.bool,
}

export {
    SwitchElement,
    SwitchElementWithState
}