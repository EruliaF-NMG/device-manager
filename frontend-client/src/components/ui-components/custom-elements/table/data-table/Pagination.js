import { ButtonElement } from '../../../form/ButtonElement';
import { emptyFunction,pageLimit } from '../../../../../configs/defaultProps.config';
import {
    LeftCircleOutlined,
    RightCircleOutlined,
} from '@ant-design/icons';

const Pagination = ({
    currentPage=1,
    perPage=1,
    totalPageCount=1,
    totalRecodes=1,
    onNext=emptyFunction,
}) => {
    return (
        <nav className="flex items-center p-4 justify-start">
            <span className="text-sm font-normal dark:text-gray-400">Showing 
                <span className="font-semibold text-gray-900 dark:text-white"> {(((currentPage||1)-1)*pageLimit)||1} - {((((currentPage||1)-1)*pageLimit))+perPage} </span> of 
                <span className="font-semibold text-gray-900"> {totalRecodes}</span>
            </span>
            <ul className="inline-flex items-center -space-x-px list-none pl-2">
                <li className='mr-2'>
                    <ButtonElement
                        icon={<LeftCircleOutlined />}
                        disabled={currentPage===1?true:false}
                        onClick={()=>onNext(currentPage-1)}
                    />
                </li>
                <li>
                    <ButtonElement
                        icon={<RightCircleOutlined />}
                        disabled={currentPage===totalPageCount?true:false}
                        onClick={()=>onNext(currentPage+1)}
                    />
                </li>
            </ul>
        </nav>
    )
}

export {
    Pagination
}