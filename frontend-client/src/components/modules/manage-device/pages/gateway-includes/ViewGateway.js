import { DescriptionsElement,DescriptionsElementItem } from '../../../../ui-components/core-components/DescriptionsElement';
import { DataTable } from '../../../../ui-components/custom-elements/table';
import { ShowStatus } from '../device-includes/ManageDevicesSubElements';
import { RenderAction, AddAction } from '../device-includes/DeviceActionElements';
import { dateToString } from '../../../../../helpers/common.helper';



const ViewGateway = ({
    rowData={},
    index=null,
}) => {

    return (
        <div>
            <DescriptionsElement>
                <DescriptionsElementItem label='Gateway Name'>{rowData.name}</DescriptionsElementItem>
                <DescriptionsElementItem label='Serial Number'>{rowData.serial_number}</DescriptionsElementItem>
                <DescriptionsElementItem label='IPV4 Address'>{rowData.ipv4_address}</DescriptionsElementItem>
            </DescriptionsElement>

            <DescriptionsElement>
                <DescriptionsElementItem label='Created At'>{dateToString(rowData.created_at)}</DescriptionsElementItem>
            </DescriptionsElement>
            
                <DataTable
                    title="Device Details"
                    headerList={[
                        {
                            heading:"Vendor Name",
                            dataIndex:"vendor",
                            defaultValue:""
                        },{
                            heading:"Status",
                            dataIndex:"status",
                            defaultValue:"",
                            onPrintCallBack:(rowData)=> (<ShowStatus rowData={rowData}/>)
                        },{
                            heading:"UID",
                            dataIndex:"uid",
                            defaultValue:""
                        }
                    ]}
                    resultBody={rowData.devices}
                    isSetAction={true}
                    isSetPagination={false}
                    renderActionBtn={(deviceData,index)=>(<RenderAction index={index} rowData={deviceData} gatewayData={rowData} />)}
                    renderAddBtn={()=><AddAction gatewayData={rowData}/>}
                />
        </div>
    );
}

export {
    ViewGateway
}