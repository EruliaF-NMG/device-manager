
import { useEffect,useContext } from 'react';
import { DataTable } from '../data-table/DataTable';

import { CoreContext } from '../../../../global-context/context-providers/CoreContext.provider';
import { _get } from '../../../../../helpers/lodash.wrappers';
import { emptyFunction } from '../../../../../configs/defaultProps.config';

const CURDTable = ({
    dataTableKey="",
    apiUrl="",
    headerList=[],
    renderActionBtn=emptyFunction,
    renderAddBtn=emptyFunction
}) => {

    const [coreState, coreAction] = useContext(CoreContext);

    const requestData = () => {
        coreAction.sendToAPI({
            method:'GET',
            apiKey:dataTableKey,
            apiUrl,   
        },dataTableKey);
    }

    useEffect(()=>{
        requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(_get(coreState,`dataTableResponses.${dataTableKey}._reloadDataTable`,undefined)!==undefined) requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[_get(coreState,`dataTableResponses.${dataTableKey}._reloadDataTable`,undefined)])

    return (
        <DataTable
            isSetAction={true}
            headerList={headerList}
            resultBody={_get(coreState,`dataTableResponses.${dataTableKey}.results`,[])}
            renderActionBtn={renderActionBtn}
            renderAddBtn={renderAddBtn}
        />
    );
}

export {
    CURDTable
}