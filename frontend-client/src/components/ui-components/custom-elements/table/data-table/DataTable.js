import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { Pagination } from './Pagination';

const DataTable=({
    headerList=[],
    resultBody=[],
    isSetAction=true,
}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left dark:text-gray-400">
                <TableHeader
                    headerList={headerList}
                    isSetAction={isSetAction}
                />
                <TableBody
                    headerList={headerList}
                    resultBody={resultBody}
                    isSetAction={isSetAction}
                />
            </table>
            <Pagination/>
        </div>
    );
}

export {
    DataTable
}