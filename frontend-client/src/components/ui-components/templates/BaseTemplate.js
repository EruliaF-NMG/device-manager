import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApartmentOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { BreadcrumbElement } from '../core-components/BreadcrumbElement';

const { Header, Sider, Content } = Layout


/**
 * Base template
 * @returns 
 */
const BaseTemplate = ({
    children=null,
    breadcrumbList=[]
}) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} className='h-screen' >
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <ApartmentOutlined />,
                        label: 'Gateway',
                    },
                    {
                        key: '2',
                        icon: <LaptopOutlined />,
                        label: 'Device',
                    },
                ]}
            />
        </Sider>
        <Layout>
            <Header className='p-0 bg-white'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className='text-base !w-16 !h-16'
                />
            </Header>
            <Content
                className='my-6 mx-4 p-6 bg-white' 
            >
                <BreadcrumbElement
                    breadcrumbList={breadcrumbList}
                    className='mb-2'
                />
                {children}
            </Content>
        </Layout>
    </Layout>
    );
};

BaseTemplate.propTypes = {
    children: PropTypes.node,
}

export {
    BaseTemplate
}