import { Iterator } from '../../../core-components/IterateData';

const TableHeader = ({
    headerList =[],
    isSetAction=true,
}) => {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:text-gray-400">
            <tr>
                <Iterator 
                    itemArray={headerList} 
                    callBackElement={(recode,index) => ( 
                        <th className="px-6 py-3" key={index}>
                            {recode.heading}
                        </th>
                    )} 
                />
                {
                    isSetAction ? (
                        <th className="px-6 py-3" key={'action'}>
                            Action
                        </th>
                    ) : (null)
                }
            </tr>
        </thead>
    )
}

export {
    TableHeader
}