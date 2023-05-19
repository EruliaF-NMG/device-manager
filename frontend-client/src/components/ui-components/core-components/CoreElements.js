import { Fragment } from "react"
import { isEmpty } from "../../../helpers/common.helper"

const ISEmpty = ({
    data=null,
    message="",
    children=(null),
}) => {
    console.log(data);
    return (
        <Fragment>
            {
                ( isEmpty(data) || data===false || (Array.isArray(data) && data.length === 0) ) ? (<div className="p-2">{message}</div>) : (<Fragment>{children}</Fragment>)
            }
        </Fragment>
    )
}

export {
    ISEmpty
}