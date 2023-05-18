import { ICoreService } from "../../../core/interfaces/core-service.interface";
import { PagingGateway } from "../gateway.model";

export interface IGatewayService<T> extends ICoreService<T> {
    pagination(filterObject:any):Promise<PagingGateway|boolean>
}