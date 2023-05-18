
import { Iterator } from '../../../core-components/IterateData';
import { _get } from '../../../../../helpers/lodash.wrappers';


const BodyTableRow = ({
    rowItem={},
    rowIndex=null,
    headerList=[],
    isSetAction=true,
}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
            <Iterator 
                itemArray={headerList} 
                callBackElement={(headerItem,headerIndex) => ( 
                    <td className="px-6 py-4" key={`key_${headerIndex}_${rowIndex}`}>
                        { _get(rowItem,headerItem.dataIndex,headerItem.defaultValue) }
                    </td>
                )} 
            />
            {
                (isSetAction) ? (
                    <td className="px-6 py-4" key={`key_action_${rowIndex}`}>
                        AAA
                    </td>
                ):(null)
            }
        </tr>
    );
}


const TableBody = ({
    resultBody=[],
    headerList=[],
    isSetAction=true,
}) => {
    return (
        <tbody>
            {
                (!resultBody || resultBody.length === 0) ? (null) : (
                    <Iterator 
                        itemArray={resultBody} 
                        callBackElement={(rowItem,rowIndex) => ( 
                            <BodyTableRow
                                key={rowIndex}
                                rowItem={rowItem}
                                rowIndex={rowIndex}
                                headerList={headerList}
                                isSetAction={isSetAction}
                            />
                        )} 
                    />
                )
            }
        </tbody>
    );
}

export {
    TableBody
}