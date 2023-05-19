
import { Modal } from 'antd';
import { emptyFunction } from '../../../configs/defaultProps.config';

const ModelPopUP = ({
    title="",
    modelClassName="",
    isModalOpen=false,
    maskClosable=false,
    onOk={emptyFunction},
    handleCancel={emptyFunction},
    modelContent=null,
    footerElements=[null]
}) => {
    return (
        <Modal 
            className={modelClassName}
            title={title} 
            open={isModalOpen} 
            onOk={onOk} 
            onCancel={handleCancel}
            footer={footerElements}
            maskClosable={maskClosable}
        >
            {modelContent}
        </Modal>
    )
}

export {
    ModelPopUP
}