import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class DevicesDTO {

    @DisplayName('UID')
    @Rules('required|numeric|min:5|uniqueUID:gateways,uid,devicesID')
    @InputField()
    public uid: string;

    @DisplayName('Vendor Name')
    @Rules(`required|max:100`)
    @InputField()
    public vendor: string;

    @DisplayName('Devices Status')
    @Rules('required')
    @InputField()
    public status: string;
}