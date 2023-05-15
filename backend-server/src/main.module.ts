import { Module } from "./core";
import GatewayModule from "./modules/gateway-manager/gateway.module";


@Module({
    modules:[GatewayModule]
})
export default class MainModule{}