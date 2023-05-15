import { CoreService } from "../../../core";
import { GatewayEntity, IGateway } from "../entities/gateway.entity";
import { IGatewayService } from "../interface/gateway-service.interface";


export class GatewayService extends CoreService<IGateway> implements IGatewayService<IGateway> {

    constructor() {
        super(GatewayEntity);
    }
}