import { Fragment } from "react"
import PropTypes from "prop-types";
import { isEmpty } from "../../../helpers/common.helper"

/**
 * Check Value is empty
 * @param {any} data 
 * @param {string} message 
 * @param {Node} children 
 * @returns 
 */
const ISEmpty = ({
    data=null,
    message="",
    children=(null),
}) => {
    return (
        <Fragment>
            {
                ( isEmpty(data) || data===false || (Array.isArray(data) && data.length === 0) ) ? (<div className="p-2">{message}</div>) : (<Fragment>{children}</Fragment>)
            }
        </Fragment>
    )
}

ISEmpty.propTypes = {    
    data: PropTypes.any,
    message: PropTypes.string,
    children: PropTypes.node,
}


export {
    ISEmpty
}