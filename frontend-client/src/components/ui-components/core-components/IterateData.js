import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { isEmpty } from '../../../helpers/common.helper';
import { emptyFunction } from '../../../configs/defaultProps.config';
import { Spinner } from './SpinnerElement';


const Iterator = ({
    itemArray = [],
    callBackElement = emptyFunction
}) => {
    return (
        <Fragment>
            {
                itemArray.map((element,index)=>callBackElement(element,index))
            }
        </Fragment>
    );
}

Iterator.propTypes = {
    itemArray: PropTypes.array,
    callBackElement: PropTypes.func,
}

const IterateData = ({
    className = '',
    itemArray = [],
    elementWhenEmpty='No Data Found.',
    callBackElement = emptyFunction,
}) =>{
    return (
        <Fragment>
            {
                (isEmpty(itemArray)) ? (
                    <div className='w-full flex justify-center mt-8' data-testid='set-spinner'>
                        <Spinner/>
                    </div>
                ) : (
                        <Fragment>
                            {
                                (itemArray.length===0) ? (
                                    <div className='w-full flex justify-center mt-8'>{elementWhenEmpty}</div>
                                ):(
                                    <div className={className}>
                                        <Iterator callBackElement={callBackElement} itemArray={itemArray} />
                                    </div>
                                )
                            }
                        </Fragment>
                )
            }
        </Fragment>
    )
}

IterateData.propTypes = {
    className: PropTypes.string,
    itemArray: PropTypes.array,
    elementWhenEmpty: PropTypes.node,
    callBackElement: PropTypes.func,
}

export {
    IterateData,
    Iterator
}