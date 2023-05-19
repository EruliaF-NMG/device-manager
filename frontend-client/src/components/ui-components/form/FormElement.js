/*
 * @Author: Chanaka Wickramasinghe 
 * @Date: 2020-03-12 15:03:57 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-09-09 07:13:01
 */
import React,{useEffect,useContext, Fragment} from "react";
import PropTypes from "prop-types";
import { Form } from 'antd';

import { FormContext } from '../../global-context/context-providers/FormContext.provider';
import { CoreContext } from '../../global-context/context-providers/CoreContext.provider';
import { Spinner } from '../core-components/SpinnerElement';
import { _get } from '../../../helpers/lodash.wrappers';
import { emptyFunction,formLayoutTypes } from '../../../configs/defaultProps.config';

 /**
 * --------------------------------------------
 * @Author: Nisal Madusanka(EruliaF)
 * @Description: Form Wrapper
 * @usedIn : 
 * --------------------------------------------
 */
const FormElement=({
    styles="",
    setGroupName="",
    setFormObject={},
    layout=formLayoutTypes.vertical,
    children=null
})=>{

    const [formState,formAction]= useContext(FormContext);
    
    useEffect(() => {   

        formAction.initFromObject(setGroupName,false,setFormObject);

        return () => {
            formAction.removeFromGroup(setGroupName);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <Fragment>
            {
                _get(formState,`${setGroupName}._onLoad`,false)===false?(
                    <Form layout={layout} className={styles} initialValues={setFormObject} >
                         {children}
                    </Form>
                ):(
                    <div>
                        <center>
                            <Spinner/>
                        </center>
                    </div>
                )
            }
        </Fragment>
    );
}

FormElement.propTypes = {    
    className: PropTypes.string,
    setGroupName: PropTypes.string,
    setFormObject: PropTypes.object,
    children: PropTypes.node,
}

export {
    FormElement
}