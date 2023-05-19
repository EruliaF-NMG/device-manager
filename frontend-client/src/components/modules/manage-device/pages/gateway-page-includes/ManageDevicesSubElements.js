import { FormElement } from '../../../../ui-components/form/FormElement';
import { InputElementWithState } from '../../../../ui-components/form/InputElement';
import { updateDeviceData, addDeviceData } from '../../../../../configs/apiEndPoints.config';
import { DescriptionsElement,DescriptionsElementItem } from '../../../../ui-components/core-components/DescriptionsElement';

const EditDevice = ({
    rowData={},
    index=null,
}) => {

    return (
        <FormElement
            setFormObject={{
                uid:rowData.uid,
                vendor:rowData.vendor,
                status:rowData.status
            }}
            setGroupName={updateDeviceData.apiKey}
            styles='py-2.5'
        >
            <InputElementWithState
                label="Device uid"
                name="uid"
                placeholder="Device uid"
                formGroupKey={updateDeviceData.apiKey}
            />

            <InputElementWithState
                label="Vendor Name"
                name="vendor"
                placeholder="Vendor Name"
                formGroupKey={updateDeviceData.apiKey}
            />

            <InputElementWithState
                label="Device status"
                name="status"
                formGroupKey={updateDeviceData.apiKey}
            />
        </FormElement>
    );
}

const CreateDevice = () => {

    return (
        <FormElement
            setFormObject={{
                uid: "",
                vendor: "",
                status: false
            }}
            setGroupName={addDeviceData.apiKey}
            styles='py-2.5'
        >
            <InputElementWithState
                label="Device uid"
                name="uid"
                placeholder="Device uid"
                formGroupKey={addDeviceData.apiKey}
            />

            <InputElementWithState
                label="Vendor Name"
                name="vendor"
                placeholder="Vendor Name"
                formGroupKey={addDeviceData.apiKey}
            />

            <InputElementWithState
                label="Device status"
                name="status"
                formGroupKey={addDeviceData.apiKey}
            />
        </FormElement>
    );
}

const ViewDevice = ({
    rowData={},
    index=null,
}) => {
    return (
        <div>
            <DescriptionsElement >
                <DescriptionsElementItem label='Device uid'>{rowData.uid}</DescriptionsElementItem>
                <DescriptionsElementItem label='Vendor Name'>{rowData.vendor}</DescriptionsElementItem>
                <DescriptionsElementItem label='Device status'>{rowData.status}</DescriptionsElementItem>
            </DescriptionsElement>
        </div>
    )
}

export {
    EditDevice,
    CreateDevice,
    ViewDevice
}