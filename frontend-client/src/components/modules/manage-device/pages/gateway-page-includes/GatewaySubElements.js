import { FormElement } from '../../../../ui-components/form/FormElement';
import { InputElementWithState } from '../../../../ui-components/form/InputElement';
import { updateGatewayData, addGatewayData } from '../../../../../configs/apiEndPoints.config';

const EditGateway = ({
    rowData={},
    index=null,
}) => {

    return (
        <FormElement
            setFormObject={{
                name:rowData.name,
                serial_number:rowData.serial_number,
                ipv4_address:rowData.ipv4_address
            }}
            setGroupName={updateGatewayData.apiKey}
            styles='py-2.5'
        >
            <InputElementWithState
                label="Gateway Name"
                name="name"
                placeholder="Name"
                formGroupKey={updateGatewayData.apiKey}
            />

            <InputElementWithState
                label="Serial Number"
                name="serial_number"
                placeholder="Serial Number"
                formGroupKey={updateGatewayData.apiKey}
            />

            <InputElementWithState
                label="IPV4 Address"
                name="ipv4_address"
                placeholder="IPV4 Address"
                formGroupKey={updateGatewayData.apiKey}
            />
        </FormElement>
    );
}

const CreateGateway = () => {

    return (
        <FormElement
            setFormObject={{
                name: "",
                serial_number: "",
                ipv4_address: ""
            }}
            setGroupName={addGatewayData.apiKey}
            styles='py-2.5'
        >
            <InputElementWithState
                label="Gateway Name"
                name="name"
                placeholder="Name"
                formGroupKey={addGatewayData.apiKey}
            />

            <InputElementWithState
                label="Serial Number"
                name="serial_number"
                placeholder="Serial Number"
                formGroupKey={addGatewayData.apiKey}
            />

            <InputElementWithState
                label="IPV4 Address"
                name="ipv4_address"
                placeholder="IPV4 Address"
                formGroupKey={addGatewayData.apiKey}
            />
        </FormElement>
    );
}

export {
    EditGateway,
    CreateGateway
}