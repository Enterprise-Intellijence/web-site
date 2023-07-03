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
import { User } from './user';

export interface Notification { 
    id?: string;
    receiver?: User;
    userTarget?: string;
    productTarget?: string;
    offerTarget?: string;
    reviewTarget?: string;
    text?: string;
    read?: boolean;
    date?: Date;
    type?: Notification.TypeEnum;
}
export namespace Notification {
    export type TypeEnum = 'NEW_OFFER' | 'OFFER_REJECTED' | 'OFFER_ACCEPTED' | 'OFFER_CANCELED' | 'REVIEW' | 'MESSAGE' | 'SALE' | 'PURCHASE' | 'PRODUCT_SOLD' | 'NEW_PRODUCT' | 'FOLLOW' | 'USER' | 'NEW_FAVORITE';
    export const TypeEnum = {
        NEWOFFER: 'NEW_OFFER' as TypeEnum,
        OFFERREJECTED: 'OFFER_REJECTED' as TypeEnum,
        OFFERACCEPTED: 'OFFER_ACCEPTED' as TypeEnum,
        OFFERCANCELED: 'OFFER_CANCELED' as TypeEnum,
        REVIEW: 'REVIEW' as TypeEnum,
        MESSAGE: 'MESSAGE' as TypeEnum,
        SALE: 'SALE' as TypeEnum,
        PURCHASE: 'PURCHASE' as TypeEnum,
        PRODUCTSOLD: 'PRODUCT_SOLD' as TypeEnum,
        NEWPRODUCT: 'NEW_PRODUCT' as TypeEnum,
        FOLLOW: 'FOLLOW' as TypeEnum,
        USER: 'USER' as TypeEnum,
        NEWFAVORITE: 'NEW_FAVORITE' as TypeEnum
    };
}