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
import { AddressDTO } from './addressDTO';
import { DeliveryDTO } from './deliveryDTO';
import { OfferBasicDTO } from './offerBasicDTO';
import { ProductBasicDTO } from './productBasicDTO';
import { TransactionDTO } from './transactionDTO';
import { UserBasicDTO } from './userBasicDTO';

export interface OrderDTO { 
    id: string;
    state: OrderDTO.StateEnum;
    orderDate?: Date;
    orderUpdateDate?: Date;
    product?: ProductBasicDTO;
    user?: UserBasicDTO;
    delivery?: DeliveryDTO;
    deliveryAddress?: AddressDTO;
    offer?: OfferBasicDTO;
    transaction?: TransactionDTO;
}
export namespace OrderDTO {
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