import { CoreService } from "../../../core";
import { getValue } from "../../../helpers/util-helpers";
import { GatewayEntity, IGateway } from "../entities/gateway.entity";
import { PagingGateway } from "../gateway.model";
import { IGatewayService } from "../interface/gateway-service.interface";


export class GatewayService extends CoreService<IGateway> implements IGatewayService<IGateway> {

    constructor() {
        super(GatewayEntity);
    }

    async pagination(filterObject:any):Promise<PagingGateway|boolean>{
        try {
            const page = Number(getValue(filterObject, 'page', 1));
            const limit = Number(getValue(filterObject, 'limit', 10));
            const skip = page <= 1 ? 0 : limit * (page - 1);

            const count = await GatewayEntity.count({deleted_status:false});
            const result = await GatewayEntity.find({deleted_status:false}).skip(skip).limit(limit).exec();

            return {
                current_page: page,
                total_pages: Math.ceil(count / limit),
                data: result,
                total_items: count,
                page_size: limit,
            }

        } catch(ex) {
            return false;
        }
    }
}