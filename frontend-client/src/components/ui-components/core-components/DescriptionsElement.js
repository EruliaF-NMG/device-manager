import { Descriptions } from 'antd';

const DescriptionsElement = ({
    title="",
    children=null,
}) => {
    return(
        <Descriptions title={title} layout={'vertical'}>{children}</Descriptions>
    );
}

const DescriptionsElementItem = ({
    label="",
    children=null,
}) => {
    return(
        <Descriptions.Item label={label}>{children}</Descriptions.Item>
    );
}

export {
    DescriptionsElement,
    DescriptionsElementItem
}