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
import { DeliveryDTO } from './deliveryDTO';
import { OfferDTO } from './offerDTO';
import { ProductDTO } from './productDTO';
import { UserDTO } from './userDTO';

export interface OrderDTO { 
    id: string;
    state: OrderDTO.StateEnum;
    orderDate?: Date;
    product?: ProductDTO;
    user?: UserDTO;
    delivery?: DeliveryDTO;
    offer?: OfferDTO;
}
export namespace OrderDTO {
    export type StateEnum = 'CANCELED' | 'PENDING' | 'PURCHASED' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED';
    export const StateEnum = {
        CANCELED: 'CANCELED' as StateEnum,
        PENDING: 'PENDING' as StateEnum,
        PURCHASED: 'PURCHASED' as StateEnum,
        SHIPPED: 'SHIPPED' as StateEnum,
        DELIVERED: 'DELIVERED' as StateEnum,
        COMPLETED: 'COMPLETED' as StateEnum
    };
}