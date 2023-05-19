import mongoose from "mongoose";
import { Column, ICoreEntity } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { DevicesSchema,IDevices } from "./devices.entity";

export interface IGateway extends ICoreEntity {
    name: String;
    serial_number: String;
    ipv4_address:String;
    devices: Array<IDevices>
}

  
export class Gateway {

    @Column({
        trim:true,
    })
    name: String;

    @Column({
        trim:true,
    })
    serial_number: String;

    @Column({
        trim:true,
    })
    ipv4_address: String;

    @Column([{
        type: DevicesSchema,
        default:()=>{[]}
    }])
    devices: Array<IDevices>;

    @Column({
        default: false,
    })
    deleted_status: boolean;

    @Column({
        default: Date.now,
    })
    created_at: Date;

    @Column({
        default: Date.now,
    })
    updated_at: Date;

    @Column({
        default: null,
    })
    deleted_at: Date|null;
}
  
export const GatewayEntity = mongooseWrapper.createModelBySchemaClass<IGateway>(Gateway);