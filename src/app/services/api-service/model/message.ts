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
import { Offer } from './offer';
import { Product } from './product';
import { User } from './user';

export interface Message { 
    id?: string;
    text?: string;
    conversationId?: string;
    messageDate?: Date;
    messageStatus?: Message.MessageStatusEnum;
    product?: Product;
    sendUser?: User;
    receivedUser?: User;
    offer?: Offer;
}
export namespace Message {
    export type MessageStatusEnum = 'READ' | 'UNREAD';
    export const MessageStatusEnum = {
        READ: 'READ' as MessageStatusEnum,
        UNREAD: 'UNREAD' as MessageStatusEnum
    };
}