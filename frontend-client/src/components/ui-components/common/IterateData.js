import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { isEmpty } from '../../../helpers/common.helper';
import { emptyFunction } from '../../../configs/defaultProps.config';
import { Spinner } from './SpinnerElement';

const IterateData = ({
    className = '',
    array = [],
    elementWhenEmpty='No Data Found.',
    callBackElement = emptyFunction,
}) =>{
    return (
        <div className={'w-full'}>
            {
                (isEmpty(array)) ? (
                    <div className='w-full flex justify-center mt-8' data-testid='set-spinner'>
                        <Spinner/>
                    </div>
                ) : (
                        <Fragment>
                            {
                                (array.length===0) ? (
                                    <div className='w-full flex justify-center mt-8'>{elementWhenEmpty}</div>
                                ):(
                                    <div className={className}>
                                        {
                                            array.map((element,index)=>callBackElement(element,index))
                                        }
                                    </div>
                                )
                            }
                        </Fragment>
                )
            }
        </div>
    )
}

IterateData.propTypes = {
    className: PropTypes.string,
    array: PropTypes.array,
    elementWhenEmpty: PropTypes.node,
    callBackElement: PropTypes.func,
}

export {
    IterateData
}