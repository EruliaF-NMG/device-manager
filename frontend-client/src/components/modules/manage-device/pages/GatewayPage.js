import { BaseTemplate } from '../../../ui-components/templates/BaseTemplate';
import { CURDTable } from '../../../ui-components/custom-elements/table';
import { getGatewayData } from '../../../../configs/apiEndPoints.config';
import { AddAction,RenderAction } from './gateway-includes/GatewayActionElements';

const breadcrumb = [
    {
        path: '/',
        title: (
          <>
            <span>Gateway</span>
          </>
        ),
    }
];


const GatewayPage = () => {
    return (
        <BaseTemplate
            breadcrumbList={breadcrumb}
        >
            <CURDTable
                title="Gateway Details"
                dataTableKey={getGatewayData.apiKey}
                apiUrl={getGatewayData.apiUrl}
                renderActionBtn={(rowData,index)=>(<RenderAction index={index} rowData={rowData} />)}
                renderAddBtn={()=><AddAction/>}
                headerList={[
                    {
                        heading:"Gateway Name",
                        dataIndex:"name",
                        defaultValue:""
                    },{
                        heading:"Serial Number",
                        dataIndex:"serial_number",
                        defaultValue:""
                    },{
                        heading:"IPV4 Address",
                        dataIndex:"ipv4_address",
                        defaultValue:""
                    },{
                        heading:"Device Count",
                        dataIndex:"",
                        onPrintCallBack:(rowData)=> (<span>{rowData.devices.length}</span>)
                    }
                ]}
            />
        </BaseTemplate>
    );
  };
  
  export default GatewayPage;