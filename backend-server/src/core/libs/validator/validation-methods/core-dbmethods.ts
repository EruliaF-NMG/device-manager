
import mongoose from 'mongoose';

import { getInputsForValidate, getValue } from '../../../../helpers/util-helpers';
import { GatewayEntity } from '../../../../modules/gateway-manager/entities/gateway.entity';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const unique = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    const filterOption :any = {
      [getValue(param, '1', key)]: formValue,
      deleted_status:false,
    };

    if (mongoose.Types.ObjectId.isValid(getValue(additionalParam, getValue(param, '2', '-'), '-'))) {
      // eslint-disable-next-line dot-notation
      filterOption['_id'] = {
        $ne: new mongoose.Types.ObjectId(getValue(additionalParam, getValue(param, '2', '-'), '-')),
      };
    }

    mongoose.connection
      .collection(getValue(param, '0', key))
      .findOne(filterOption, (error:any, result:any) => {
        if (result) {
          cb(message, null);
        } else {
          cb(null, true);
        }
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const uniqueUID = async (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);

   GatewayEntity.aggregate([
        { $match: { "deleted_status" :false } },
        { $unwind: '$devices'},
        { $match: { 
          'devices.uid' : Number(formValue), 
          'devices._id': {
              $ne:  new mongoose.Types.ObjectId(additionalParam['devicesID']) ,
          }
        }
      }
      ]).exec().then((result)=>{
        if(result.length===0) cb(null, true);
        else cb(message, null);
      }).catch((error)=>{
        cb(true);
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const checkDeviceCount = async (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    mongoose.connection
      .collection('gateways')
      .findOne({'_id':new mongoose.Types.ObjectId(additionalParam['gatewayID'])}, (error:any, result:any) => {
        if (result) {
          if(result.devices.length >= 10) cb(message, null);
          else cb(null, true);
        } else {
          cb(null, true);
        }
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
}


export { unique, uniqueUID,checkDeviceCount };