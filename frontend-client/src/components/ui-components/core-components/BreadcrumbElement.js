import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";

/**
 * Breadcrumb UI element
 * @param {Array} breadcrumbList 
 * @returns 
 */
const BreadcrumbElement = ({
    breadcrumbList=[]
}) =>{


    const itemRender=(route, params, items, paths) => {
        return route.path === "" ? <span>{route.title}</span> : <NavLink to={route.path}>{route.title}</NavLink>;
    }

    return (
        <Breadcrumb
            itemRender={itemRender}
            items={[
                ...[{
                    path: '',
                    title: <HomeOutlined />,
                    },
                ...breadcrumbList
                ]
            ]}
            className='!mb-6'
        />
    )
}

BreadcrumbElement.propTypes = {    
    breadcrumbList: PropTypes.array,
}

export {
    BreadcrumbElement
};