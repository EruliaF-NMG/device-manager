import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class GatewayDTO {

    @DisplayName('Gateway Name')
    @Rules('required|max:100')
    @InputField()
    public name: string;

    @DisplayName('Serial Number')
    @Rules(`required|max:100|unique:gateways,serial_number,gatewayID`)
    @InputField()
    public serial_number: string;

    @DisplayName('IPV4 Address')
    @Rules('required|isIpv4|unique:gateways,ipv4_address,gatewayID')
    @InputField()
    public ipv4_address: string;
}