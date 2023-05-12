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
import { ClothingDTO } from './clothingDTO';
import { EntertainmentDTO } from './entertainmentDTO';
import { HomeDTO } from './homeDTO';
import { MessageDTO } from './messageDTO';
import { Money } from './money';
import { OrderDTO } from './orderDTO';
import { ProductDTO } from './productDTO';
import { UserDTO } from './userDTO';

export interface OfferDTO { 
    id?: string;
    amount?: Money;
    state?: OfferDTO.StateEnum;
    offerer?: UserDTO;
    product?: ProductDTO | ClothingDTO | EntertainmentDTO | HomeDTO;
    message?: MessageDTO;
    order?: OrderDTO;
}
export namespace OfferDTO {
    export type StateEnum = 'PENDING' | 'ACCEPTED' | 'REJECTED';
    export const StateEnum = {
        PENDING: 'PENDING' as StateEnum,
        ACCEPTED: 'ACCEPTED' as StateEnum,
        REJECTED: 'REJECTED' as StateEnum
    };
}