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
import { Address } from './address';
import { Delivery } from './delivery';
import { Offer } from './offer';
import { Product } from './product';
import { Transaction } from './transaction';
import { User } from './user';

export interface Order { 
    id?: string;
    orderDate?: Date;
    orderUpdateDate?: Date;
    state?: Order.StateEnum;
    product?: Product;
    user?: User;
    delivery?: Delivery;
    deliveryAddress?: Address;
    offer?: Offer;
    transaction?: Transaction;
}
export namespace Order {
    export type StateEnum = 'CANCELED' | 'PENDING' | 'PURCHASED' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'REVIEWED';
    export const StateEnum = {
        CANCELED: 'CANCELED' as StateEnum,
        PENDING: 'PENDING' as StateEnum,
        PURCHASED: 'PURCHASED' as StateEnum,
        SHIPPED: 'SHIPPED' as StateEnum,
        DELIVERED: 'DELIVERED' as StateEnum,
        COMPLETED: 'COMPLETED' as StateEnum,
        REVIEWED: 'REVIEWED' as StateEnum
    };
}