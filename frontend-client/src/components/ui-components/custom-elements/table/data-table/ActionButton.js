
import { Fragment,useState,useImperativeHandle,forwardRef } from 'react';

import { ButtonElement } from '../../../form/ButtonElement';
import { buttonTypes,emptyFunction,buttonShape,buttonSize } from '../../../../../configs/defaultProps.config';
import { ModelPopUP } from '../../../core-components/ModelPopUP';

const ActionButton = forwardRef(({
    type=buttonTypes.primary,
    btnText=null,
    icon=null,
    disabled=false,
    danger=false,
    styles="",
    shape=buttonShape.default,
    size=buttonSize.middle,
    modelTitle="",
    modelClassName="",
    modelContent=null,
    modelFooterElements=[null]
},ref) =>{

    const [isOpen,setOpenStatus] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            closeModel: () => { 
                setOpenStatus(false);
            }
        }
    }, []);

    return (
        <Fragment>
            <ButtonElement
                icon={icon}
                type={type}
                disabled={disabled}
                styles={styles}
                shape={shape}
                size={size}
                danger={danger}
                children={btnText}
                onClick={()=>setOpenStatus(true)}
            />
            <ModelPopUP
                title={modelTitle}
                modelClassName={modelClassName}
                isModalOpen={isOpen}
                handleCancel={()=>setOpenStatus(false)}
                footerElements={modelFooterElements}
                modelContent={modelContent}
            />
        </Fragment>
    );
});

export {
    ActionButton
}