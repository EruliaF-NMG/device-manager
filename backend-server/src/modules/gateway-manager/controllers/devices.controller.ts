import { Request, Response } from "express";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";
import { IGateway } from "../entities/gateway.entity";
import { IGatewayService } from "../interface/gateway-service.interface";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { Delete } from "../../../core/decorators/router.decorator";
import { DevicesDTO } from "../dtos/devices.dto";
import { IDevices } from "../entities/devices.entity";
import { exceptionOccurredResponse, failedPostResponse, 
    successGetResponse, successPostResponse,successPutResponse,failedPutResponse,
    failedDeleteResponse, successDeleteResponse
} from "../../../config/api-response.config";



@Injectable()
@Controller('/api/gateway')
export default class DevicesController {
    
    constructor(
        @Inject("IGatewayService") private _gatewayService: IGatewayService<IGateway>,
    ) {}

    @Get('/:gatewayID/devices')
    async getAll(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.gatewayID);
            const gateways = await this._gatewayService.findOne({_id:_id,deleted_status:false});
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,gateways.devices));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get device data'));
        }
    }

    @Post('/:gatewayID/devices')
    @ValidateBodyRequest(DevicesDTO)
    async create(request: Request, response: Response) {
        try{
            const gatewayID = request.params.gatewayID;
            const _id = mongooseWrapper.getObjectID(gatewayID);
            const devicesData = request.body as IDevices;
            const gatewayObj:IGateway = await this._gatewayService.findByID(gatewayID);
            gatewayObj.devices.push(devicesData)
            const gateway = await this._gatewayService.update({_id},gatewayObj);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,gateway,'Devices created successfully'));
        } catch(ex){
            console.log(ex);
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to create devices'));
        }
    }

    @Put('/:gatewayID/devices/:devicesID')
    @ValidateBodyRequest(DevicesDTO)
    async update(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.devicesID);
            const gatewayID = mongooseWrapper.getObjectID(request.params.gatewayID);
            const devicesData = request.body as IDevices;
            const gateway = await this._gatewayService.update({ _id: gatewayID, 'devices._id':_id},{
                'devices.$.uid':devicesData.uid,
                'devices.$.vendor':devicesData.vendor,
                'devices.$.status':devicesData.status,
            });
            if(gateway)  return response.status(successPutResponse.httpStatus)
                            .json(generateResponse(successPutResponse,gateway,'Devices update successfully'));
            else    return response.status(failedPutResponse.httpStatus)
                            .json(generateErrorResponse(failedPutResponse,{},'Failed to update devices'));                   
        } catch(ex){ 
            return response.status(failedPutResponse.httpStatus)
                .json(generateErrorResponse(failedPutResponse,ex,'Failed to update devices'));
        }
    }

    @Delete("/:gatewayID/devices/:devicesID")
    async delete(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.devicesID);
            const gatewayID = mongooseWrapper.getObjectID(request.params.gatewayID);
            const gateway = await this._gatewayService.update({_id:gatewayID},
                { $pull: { devices: { _id: _id } } });
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