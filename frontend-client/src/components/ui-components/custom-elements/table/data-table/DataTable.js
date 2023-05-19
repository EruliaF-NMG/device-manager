import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { Pagination } from './Pagination';
import { ISEmpty } from '../../../core-components/CoreElements';
import { emptyFunction } from '../../../../../configs/defaultProps.config';
import { Fragment } from 'react';

const DataTable=({
    title="",
    headerList=[],
    resultBody=[],
    isSetAction=true,
    isSetPagination=true,
    currentPage=1,
    perPage=1,
    totalPageCount=1,
    totalRecodes=1,
    renderActionBtn=emptyFunction,
    renderAddBtn=emptyFunction,
    onNext=emptyFunction,
}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className='flex flex-row p-2'>
                <h1 className='m-0 w-2/4 text-base'>{title}</h1>
                <div className='flex w-2/4 justify-end'>
                    {renderAddBtn()}
                </div>
            </div>
            <ISEmpty message='No Result Found' data={resultBody} >
                <Fragment>
                    <table className="w-full text-sm text-left dark:text-gray-400">
                        <TableHeader
                            headerList={headerList}
                            isSetAction={isSetAction}
                        />
                        <TableBody
                            headerList={headerList}
                            resultBody={resultBody}
                            isSetAction={isSetAction}
                            renderActionBtn={renderActionBtn}
                        />
                    </table>
                    <ISEmpty message='' data={isSetPagination} >
                        <Pagination
                            currentPage={currentPage}
                            perPage={perPage}
                            totalPageCount={totalPageCount}
                            totalRecodes={totalRecodes}
                            onNext={onNext}
                        />
                    </ISEmpty>
                </Fragment>
            </ISEmpty>
        </div>
    );
}

export {
    DataTable
}