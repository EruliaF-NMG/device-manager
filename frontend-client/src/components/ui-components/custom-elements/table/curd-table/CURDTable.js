
import { useEffect,useContext } from 'react';
import { DataTable } from '../data-table/DataTable';

import { CoreContext } from '../../../../global-context/context-providers/CoreContext.provider';
import { _get } from '../../../../../helpers/lodash.wrappers';

const CURDTable = ({
    dataTableKey="",
    apiUrl="",
    headerList=[],
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

    return (
        <DataTable
            isSetAction={true}
            headerList={headerList}
            resultBody={_get(coreState,`dataTableResponses.${dataTableKey}.results`,[])}
        />
    );
}

export {
    CURDTable
}