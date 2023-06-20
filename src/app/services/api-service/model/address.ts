/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Delivery } from './delivery';
import { Order } from './order';
import { User } from './user';

export interface Address { 
    id?: string;
    header?: string;
    country?: string;
    city?: string;
    street?: string;
    zipCode?: string;
    phoneNumber?: string;
    orders?: Array<Order>;
    user?: User;
    sentDeliveries?: Array<Delivery>;
    receivedDeliveries?: Array<Delivery>;
    _default?: boolean;
}