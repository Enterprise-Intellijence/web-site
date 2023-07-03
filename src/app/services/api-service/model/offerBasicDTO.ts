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
import { CustomMoneyDTO } from './customMoneyDTO';

export interface OfferBasicDTO { 
    id?: string;
    amount?: CustomMoneyDTO;
    state?: OfferBasicDTO.StateEnum;
    creationTime?: Date;
}
export namespace OfferBasicDTO {
    export type StateEnum = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
    export const StateEnum = {
        PENDING: 'PENDING' as StateEnum,
        ACCEPTED: 'ACCEPTED' as StateEnum,
        REJECTED: 'REJECTED' as StateEnum,
        CANCELLED: 'CANCELLED' as StateEnum
    };
}