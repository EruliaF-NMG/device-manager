import { Fragment,useRef } from 'react';
import { ActionButton } from '../../../../ui-components/custom-elements/table';
import { ButtonElement,ButtonElementWithState } from '../../../../ui-components/form/ButtonElement';
import { CreateDevice,EditDevice,ViewDevice } from './ManageDevicesSubElements';
import { updateDeviceData, addDeviceData,getGatewayData, removeDeviceData } from '../../../../../configs/apiEndPoints.config';
import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const AddAction = ({ gatewayData }) => {
    const addActionRef = useRef(null);
    return (
        <ActionButton 
            btnText="Create New Device"
            modelTitle="Create Device"
            modelContent={<CreateDevice />}
            modelFooterElements={[(
                <ButtonElementWithState 
                    key={1} 
                    apiUrl={`${addDeviceData.apiUrl}${gatewayData._id}/devices`}
                    apiMethod="POST"
                    dataTableKey={getGatewayData.apiKey}
                    formGroupKey={addDeviceData.apiKey}
                    formValidateObject={{
                        fields:{
                            'uid':'Device uid',
                            'vendor':'Vendor Name',
                            'status':'Device status'
                        },
                        rules:{
                            'uid':'required|numeric|min:5',
                            'vendor':'required|max:100'
                        }
                    }}
                    onClick={(error)=>{
                        if(!error) addActionRef.current.closeModel();
                    }}
                >Submit</ButtonElementWithState>
            )]}
            ref={addActionRef}
        />
    );
}

const RenderAction=({rowData,index,gatewayData})=>{
    const viewActionRef = useRef(null);
    const editActionRef = useRef(null);
    const removeActionRef = useRef(null);
    return (
        <Fragment>
            <ActionButton 
                styles='!mr-1' 
                icon={<EyeOutlined />}
                modelTitle="View Device"
                modelClassName="!w-2/4"
                modelFooterElements={[(
                    <ButtonElement 
                        key={1} 
                        onClick={()=>{
                            viewActionRef.current.closeModel();
                        }}
                    >Close</ButtonElement>
                )]}
                ref={viewActionRef}
                modelContent={<ViewDevice rowData={rowData} index={index} />}
            />
            <ActionButton 
                styles='!mr-1' 
                icon={<EditOutlined />}
                modelTitle="Edit Device"
                modelContent={<EditDevice rowData={rowData} index={index} />}
                modelFooterElements={[(
                    <ButtonElementWithState 
                        key={1} 
                        apiUrl={`${updateDeviceData.apiUrl}${gatewayData._id}/devices/${rowData._id}`}
                        apiMethod="PUT"
                        dataTableKey={getGatewayData.apiKey}
                        formGroupKey={updateDeviceData.apiKey}
                        formValidateObject={{
                            fields:{
                                'uid':'Device uid',
                                'vendor':'Vendor Name',
                                'status':'Device status'
                            },
                            rules:{
                                'uid':'required',
                                'vendor':'required'
                            }
                        }}
                        onClick={(error)=>{
                            if(!error) editActionRef.current.closeModel();
                        }}
                    >Submit</ButtonElementWithState>
                )]}
                ref={editActionRef}
            />
            <ActionButton 
                styles='!mr-1' 
                danger={true} 
                icon={<DeleteOutlined />}
                modelTitle="Delete Confirmation"
                modelContent={<span>Are you sure you want to delete this record?</span>}
                modelFooterElements={[(
                    <ButtonElementWithState 
                        key={1} 
                        apiUrl={`${removeDeviceData.apiUrl}${gatewayData._id}/devices/${rowData._id}`}
                        apiMethod="DELETE"
                        dataTableKey={getGatewayData.apiKey}
                        formGroupKey={removeDeviceData.apiKey}
                        onClick={(error)=>{
                            if(!error) removeActionRef.current.closeModel();
                        }}
                        danger={true}
                    >Remove</ButtonElementWithState>
                )]}
                ref={removeActionRef}
            />
        </Fragment>
    )
}

export {
    AddAction,
    RenderAction
}