import { Module } from "../../core";
import DevicesController from "./controllers/devices.controller";
import GatewayController from "./controllers/gateway.controller";
import { GatewayService } from "./services/gateway.service";


@Module({
    controllers:[GatewayController,DevicesController],
    services:[
        { provide: 'IGatewayService', useClass: GatewayService },
    ]
})
export default class GatewayModule{}