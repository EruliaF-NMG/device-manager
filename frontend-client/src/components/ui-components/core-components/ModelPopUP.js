
import { Modal } from 'antd';
import PropTypes from "prop-types";
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
            destroyOnClose={true}
        >
            {modelContent}
        </Modal>
    )
}

PropTypes.propTypes = {    
    title: PropTypes.string,
    modelClassName: PropTypes.string,
    isModalOpen: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onOk: PropTypes.func,
    handleCancel: PropTypes.func,
    modelContent: PropTypes.node,
    footerElements: PropTypes.arrayOf(NodeList),
}

export {
    ModelPopUP
}