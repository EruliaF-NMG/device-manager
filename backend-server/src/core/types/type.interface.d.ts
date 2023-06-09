import { Handler,Request } from "express";

export type Class = { new(...args: any[]): any; };

export type ControllerInstance = {
    [ handleName: string ] : Handler 
}

export type RouteDefinitionInterface = {
    path: string;
    method: 'get' | 'post' | 'delete' | 'put';
    methodName: string;
}

export interface Provider{
    provide: string;
    useClass: Class;
}

export type ArrayOfClasses = Array<Class>

export type Module = {
    controllers?: ArrayOfClasses,
    repositories?: Array<Provider>,
    services?: Array<Provider>,
    modules?: ArrayOfClasses
}

export type CustomValidationMessage = {
    [ validationMethod: string ] : string 
}

export interface CustomRequest<T> extends Request {
    body: T,
    params: any,
    query: any
}

export interface ValidateObjectMetaData {
    properties: Map<string,string>;
    message?: Map<string,any>;
    rules?: Map<string,string>;
    fields?: Map<string,string>;
    useClass: Class;
}

export type DBReturnStatus<T> = {
    status:boolean,
    message:string,
    returnObject:T|null
}