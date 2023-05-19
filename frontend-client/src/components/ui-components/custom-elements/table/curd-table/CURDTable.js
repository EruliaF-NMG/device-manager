
import { useEffect,useContext } from 'react';
import { DataTable } from '../data-table/DataTable';

import { CoreContext } from '../../../../global-context/context-providers/CoreContext.provider';
import { _get } from '../../../../../helpers/lodash.wrappers';
import { emptyFunction,pageLimit } from '../../../../../configs/defaultProps.config';

const CURDTable = ({
    dataTableKey="",
    apiUrl="",
    title="",
    headerList=[],
    renderActionBtn=emptyFunction,
    renderAddBtn=emptyFunction
}) => {

    const [coreState, coreAction] = useContext(CoreContext);

    const requestData = (pageNumber=1) => {
        coreAction.sendToAPI({
            method:'GET',
            apiKey:dataTableKey,
            apiUrl:`${apiUrl}?page=${pageNumber}&limit=${pageLimit}`,   
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
            title={title}
            isSetAction={true}
            headerList={headerList}
            resultBody={_get(coreState,`dataTableResponses.${dataTableKey}.results`,[])}
            renderActionBtn={renderActionBtn}
            renderAddBtn={renderAddBtn}
            currentPage={Number(_get(coreState,`dataTableResponses.${dataTableKey}.current_page`,1))}
            perPage={Number(_get(coreState,`dataTableResponses.${dataTableKey}.per_page`,1))}
            totalPageCount={Number(_get(coreState,`dataTableResponses.${dataTableKey}.page_count`,1))}
            totalRecodes={Number(_get(coreState,`dataTableResponses.${dataTableKey}.total`,1))}
            onNext={(pageNumber)=>requestData(pageNumber)}
        />
    );
}

export {
    CURDTable
}