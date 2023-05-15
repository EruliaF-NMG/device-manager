import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, ValidateBodyRequest } from "../../../core";
import { generateErrorResponse, generateResponse, getDroneWeightLimit } from "../../../helpers/util-helpers";
import { IGateway } from "../entities/gateway.entity";
import { IGatewayService } from "../interface/gateway-service.interface";


@Injectable()
@Controller('/api/gateway')
export default class GatewayController {
    
    constructor(
        @Inject("IGatewayService") private _gatewayService: IGatewayService<IGateway>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,"hi"));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get dispatch data'));
        }
    }


}