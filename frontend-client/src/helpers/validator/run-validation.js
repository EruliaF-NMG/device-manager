import { eachOf, eachOfLimit } from 'async';
import { errorMessageList } from '../../configs/validation.config';

import * as validateMethos  from './validation-methods';

export default class RunValidation {

  rules = {};
  fileds= {};
  message= {};
  formObject= {};
  additionalParam= {};

  constructor(formObject) {
   
    this.rules = formObject.rules;
    this.fileds = formObject.fileds;
    this.message = formObject.message;
    this.formObject = formObject.formObject;
    this.additionalParam = formObject.additionalParam;
  }

  /**
   * @author Nisal Madusanka(EruliaF)
   * @description run validation
   * @param {*} cb callback function
   */
  validate(cb) {
    let errorList = {
      __status: false,
      details: [],
    };

    eachOf(
      this.rules,
      (rulesItem, rulesKey, callback) => {
        this.spreadAllValidationRules(rulesKey, (error) => {
          if (error) {
            errorList = {
              ...errorList,
              __status: true,
              details: [
                ...errorList.details,
                {
                  property: rulesKey,
                  message: error,
                },
              ],
            };
          }

          callback(null);
        });
      },
      () => {
        // eslint-disable-next-line no-underscore-dangle
        if (errorList.__status === true) {
          cb(errorList.details);
        } else {
          cb(null, true);
        }
      }
    );
  }

  spreadAllValidationRules(rulesKey, cb) {
    if (rulesKey.indexOf('*') > -1) {
      // Todo
    } else {
      const subRulesSet = (this.rules[rulesKey]).split('|');
      this.checkValidity(rulesKey, subRulesSet, rulesKey, cb);
    }
  }

  checkValidity(inputKey, subRulesSet, rulesKey, cb) {
    try {
      eachOfLimit(
        subRulesSet,
        1,
        (subRule, subKey, callback) => {
          let param = [];
          let method = subRule;
          if (subRule.includes(':')) {
            param = subRule.split(':');
            // eslint-disable-next-line prefer-destructuring
            method = param[0];
            param = param[1].split(',');
          }

          const message = this.getMessage(inputKey, method);

          (validateMethos)[method](
            inputKey,
            this.formObject,
            param,
            message,
            this.fileds,
            this.additionalParam,
            (error) => {
              if (error) {
                callback(error);
              } else {
                callback(null);
              }
            }
          );
        },
        (error) => {
          if (error) {
            cb(error);
          } else {
            cb(null, true);
          }
        }
      );
    } catch (ex) {
      console.log(ex);
      cb(ex);
    }
  }

  getMessage(inputKey, method) {
    try {
      let messsage =
        this.message &&
        Object.prototype.hasOwnProperty.call(
          this.message,
          `${inputKey}.${method}`
        )
          ? this.message[`${inputKey}.${method}`]
          : errorMessageList[method] || '';

      messsage = messsage.replace(':attribute', this.getFiledName(inputKey));

      return messsage;
    } catch (ex) {
      console.log(
        `${
          '----------------Validation Exception-------------------' +
          '\n' +
          'Exception occurred at executing ---- getMessage-'
        }${method}\n` +
          `${ex}\n` +
          `------------------------------------------------`
      );
      return 'Error Message';
    }
  }

  //---

  getFiledName(key) {
    if (this.fileds) {
      if (Object.prototype.hasOwnProperty.call(this.fileds, key)) {
        return this.fileds[key];
      }
      return key;
    }
    return key;
  }
}