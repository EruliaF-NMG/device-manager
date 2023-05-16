import mongoose from "mongoose";
import { ICoreEntity } from "../../../core";
import { Column } from "../../../core/decorators/db.decorator";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";


export interface IDevices extends ICoreEntity {
    uid: Number;
    vendor: String;
    status: Boolean;
}

export class Devices {
    @Column({
    })
    uid: Number;

    @Column({
        trim: true,
    })
    vendor: String;

    @Column({
        default: true,
    })
    status: Boolean;

    @Column({
        default: Date.now,
    })
    created_at: Date;

    @Column({
        default: Date.now,
    })
    updated_at: Date;
}

export const DevicesSchema = mongooseWrapper.createSchemaByClass<IDevices>(Devices);