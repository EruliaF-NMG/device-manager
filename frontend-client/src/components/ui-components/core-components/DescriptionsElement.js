import { Descriptions } from 'antd';
import PropTypes from "prop-types";

const DescriptionsElement = ({
    title="",
    children=null,
}) => {
    return(
        <Descriptions title={title} layout={'vertical'}>{children}</Descriptions>
    );
}

DescriptionsElement.propTypes = {    
    title: PropTypes.string,
    children: PropTypes.node,
}

const DescriptionsElementItem = ({
    label="",
    children=null,
}) => {
    return(
        <Descriptions.Item label={label}>{children}</Descriptions.Item>
    );
}

DescriptionsElementItem.propTypes = {    
    label: PropTypes.string,
    children: PropTypes.node,
}

export {
    DescriptionsElement,
    DescriptionsElementItem
}