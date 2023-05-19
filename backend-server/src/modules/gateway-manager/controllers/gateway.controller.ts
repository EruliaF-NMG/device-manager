import { Request, Response } from "express";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { IGateway } from "../entities/gateway.entity";
import { IGatewayService } from "../interface/gateway-service.interface";
import { GatewayDTO } from "../dtos/gateway.dto";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { Delete } from "../../../core/decorators/router.decorator";
import { exceptionOccurredResponse, failedPostResponse, 
    successGetResponse, successPostResponse,successPutResponse,failedPutResponse,
    failedDeleteResponse, successDeleteResponse
} from "../../../config/api-response.config";

@Injectable()
@Controller('/api/gateway')
export default class GatewayController {
    
    constructor(
        @Inject("IGatewayService") private _gatewayService: IGatewayService<IGateway>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const gateways = await this._gatewayService.pagination(request.query);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,gateways));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get gateway data'));
        }
    }

    @Post()
    @ValidateBodyRequest(GatewayDTO)
    async create(request: Request, response: Response) {
        try{
            let data = request.body as GatewayDTO;
            const gateway = await this._gatewayService.create(data);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,gateway,'Gateway created successfully'));
        } catch(ex){
            console.log(ex);
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to create gateway'));
        }
    }

    @Put("/:gatewayID")
    @ValidateBodyRequest(GatewayDTO)
    async update(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.gatewayID);
            const data = request.body as GatewayDTO;
            const gateway = await this._gatewayService.update({_id},data);
            if(gateway)  return response.status(successPutResponse.httpStatus)
                            .json(generateResponse(successPutResponse,gateway,'Gateway update successfully'));
            else    return response.status(failedPutResponse.httpStatus)
                            .json(generateErrorResponse(failedPutResponse,{},'Failed to update gateway'));                   
        } catch(ex){ 
            return response.status(failedPutResponse.httpStatus)
                .json(generateErrorResponse(failedPutResponse,ex,'Failed to update gateway'));
        }
    }

    @Delete("/:gatewayID")
    async delete(request: Request, response: Response) {
        try{
            const gateway = await this._gatewayService.softDelete(request.params.gatewayID);
            if(gateway)  return response.status(successDeleteResponse.httpStatus)
                            .json(generateResponse(successDeleteResponse,gateway,'Gateway removed successfully'));
            else    return response.status(failedDeleteResponse.httpStatus)
                            .json(generateErrorResponse(failedDeleteResponse,{},'Failed to removed gateway'));                   
        } catch(ex){ 
            return response.status(failedDeleteResponse.httpStatus)
                .json(generateErrorResponse(failedDeleteResponse,ex,'Failed to removed gateway'));
        }
    }

}