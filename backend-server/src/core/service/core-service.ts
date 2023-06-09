
 import { FilterQuery, HydratedDocument, Model, QueryOptions, QueryWithHelpers, UpdateQuery } from "mongoose";
import { ICoreService } from "../interfaces/core-service.interface";

export default class CoreService<T> implements ICoreService<T> {

    public model:Model<T>;

    constructor(model:Model<T>) {
      this.model = model;
    }
  
    /**
     * @description add data to db
     * @param {Object} createObject
     */
    async create(createObject={}): Promise<HydratedDocument<T>> {
        return await this.model.create(createObject); 
    }

    /**
     * @description find by id
     * @param {Object} filterOption
     * @param {Function} cb
     */
    async findByID(id:string): Promise<HydratedDocument<T>> {
        return await this.model.findById(id);
    }

    /**
     * @description filter all data from model
     * @param {Object} filterOption
     * @param {Object} updateData
     */
    async update(filterOption:FilterQuery<T>, updateData:UpdateQuery<T>,options: QueryOptions<T>|null = { new: true }) : Promise<HydratedDocument<T>> {
        return await this.model.findOneAndUpdate(filterOption, updateData, { new: true });
    }

    /**
     * @description filter all data from model
     * @param {Object} filterOption
     */
    async find(filterOption:FilterQuery<T> = {}): Promise<Array<HydratedDocument<T>>> {
        return await this.model.find(filterOption,null,{lean:true});
    }
  
    /**
     * @description find One data from model
     * @param {Object} filterOption
     */
    async findOne(filterOption:FilterQuery<T> = {}): Promise<HydratedDocument<T>> {
        return await this.model.findOne(filterOption,null,{lean:true});
    }

        /**
     * @description soft delete recodes
     * @param {String} _id
     */
        async softDelete(_id:string) : Promise<HydratedDocument<T>> {
            try{
                const data:any = await this.findByID(_id);
                data.deleted_at = new Date();
                data.deleted_status = true;
                return await this.update({_id},data);
            } catch(ex) {
                throw new Error("Unable to remove recode");
            }
        }
  
}