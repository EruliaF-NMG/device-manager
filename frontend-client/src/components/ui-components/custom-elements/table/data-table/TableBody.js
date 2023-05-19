
import { Iterator } from '../../../core-components/IterateData';
import { _get } from '../../../../../helpers/lodash.wrappers';
import { emptyFunction } from '../../../../../configs/defaultProps.config';
import { Fragment } from 'react';


const BodyTableRow = ({
    rowItem={},
    rowIndex=null,
    headerList=[],
    isSetAction=true,
    renderActionBtn=emptyFunction
}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
            <Iterator 
                itemArray={headerList} 
                callBackElement={(headerItem,headerIndex) => ( 
                    <td className="px-6 py-4" key={`key_${headerIndex}_${rowIndex}`}>
                        <Fragment>
                            {
                                (_get(headerItem,'onPrintCallBack',null)===null) ? 
                                        (<Fragment>{ _get(rowItem,headerItem.dataIndex,headerItem.defaultValue) }</Fragment>) : 
                                        (<Fragment>{ headerItem.onPrintCallBack(rowItem,rowIndex) }</Fragment>)
                            }
                        </Fragment>
                    </td>
                )} 
            />
            {
                (isSetAction) ? (
                    <td className="px-6 py-4" key={`key_action_${rowIndex}`}>
                        {renderActionBtn(rowItem,rowIndex)}
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
    renderActionBtn=emptyFunction
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
                                renderActionBtn={renderActionBtn}
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