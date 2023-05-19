
import { Fragment,useRef } from 'react';
import { ActionButton } from '../../../../ui-components/custom-elements/table';
import { EditGateway,CreateGateway } from './GatewaySubElements';
import { ViewGateway } from './ViewGateway';
import { ButtonElementWithState,ButtonElement } from '../../../../ui-components/form/ButtonElement';
import { updateGatewayData, addGatewayData, removeGatewayData, getGatewayData  } from '../../../../../configs/apiEndPoints.config';
import {
    EditOutlined,
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const AddAction = () => {
    const addActionRef = useRef(null);
    return (
        <ActionButton 
            btnText="Create New Gateway"
            modelTitle="Add Gateway"
            modelContent={<CreateGateway />}
            modelFooterElements={[(
                <ButtonElementWithState 
                    key={1} 
                    apiUrl={`${addGatewayData.apiUrl}`}
                    apiMethod="POST"
                    dataTableKey={getGatewayData.apiKey}
                    formGroupKey={addGatewayData.apiKey}
                    formValidateObject={{
                        fields:{
                            'name':'Gateway Name',
                            'serial_number':'Serial Number',
                            'ipv4_address':'IPV4 Address'
                        },
                        rules:{
                            'name':'required',
                            'serial_number':'required',
                            'ipv4_address':'required'
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

const RenderAction=({rowData,index})=>{
    const viewActionRef = useRef(null);
    const editActionRef = useRef(null);
    const removeActionRef = useRef(null);
    return (
        <Fragment>
            <ActionButton 
                styles='!mr-1' 
                icon={<EyeOutlined />}
                modelTitle="View Gateway"
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
                modelContent={<ViewGateway rowData={rowData} index={index} />}
            />
            <ActionButton 
                styles='!mr-1' 
                icon={<EditOutlined />}
                modelTitle="Edit Gateway"
                modelContent={<EditGateway rowData={rowData} index={index} />}
                modelFooterElements={[(
                    <ButtonElementWithState 
                        key={1} 
                        apiUrl={`${updateGatewayData.apiUrl}${rowData._id}`}
                        apiMethod="PUT"
                        dataTableKey={getGatewayData.apiKey}
                        formGroupKey={updateGatewayData.apiKey}
                        formValidateObject={{
                            fields:{
                                'name':'Gateway Name',
                                'serial_number':'Serial Number',
                                'ipv4_address':'IPV4 Address'
                            },
                            rules:{
                                'name':'required',
                                'serial_number':'required',
                                'ipv4_address':'required'
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
                        apiUrl={`${removeGatewayData.apiUrl}${rowData._id}`}
                        apiMethod="DELETE"
                        dataTableKey={getGatewayData.apiKey}
                        formGroupKey={removeGatewayData.apiKey}
                        onClick={(error)=>{
                            if(!error) editActionRef.current.closeModel();
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