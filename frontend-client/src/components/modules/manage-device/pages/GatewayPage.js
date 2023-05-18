
import { BaseTemplate } from '../../../ui-components/templates/BaseTemplate';
import { CURDTable } from '../../../ui-components/custom-elements/table';
import { getGatewayData } from '../../../../configs/apiEndPoints.config';

const GatewayPage = () => {
    return (
        <BaseTemplate
            breadcrumbList={[
                {
                    path: '/',
                    title: (
                      <>
                        <span>Gateway</span>
                      </>
                    ),
                  }
            ]}
        >
            <CURDTable
                dataTableKey={getGatewayData.apiKey}
                apiUrl={getGatewayData.apiUrl}
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
                    }
                ]}
            />
        </BaseTemplate>
    );
  };
  
  export default GatewayPage;