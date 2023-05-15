import { Module } from "../../core";
import GatewayController from "./controllers/gateway.controller";
import { GatewayService } from "./services/gateway.service";


@Module({
    controllers:[GatewayController],
    services:[
        { provide: 'IGatewayService', useClass: GatewayService },
    ]
})
export default class GatewayModule{}