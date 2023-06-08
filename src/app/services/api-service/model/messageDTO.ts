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
import { OfferBasicDTO } from './offerBasicDTO';
import { ProductBasicDTO } from './productBasicDTO';
import { UserBasicDTO } from './userBasicDTO';

export interface MessageDTO { 
    id?: string;
    conversationId?: string;
    text: string;
    messageDate?: Date;
    messageStatus?: MessageDTO.MessageStatusEnum;
    product?: ProductBasicDTO;
    sendUser: UserBasicDTO;
    receivedUser: UserBasicDTO;
    offer?: OfferBasicDTO;
}
export namespace MessageDTO {
    export type MessageStatusEnum = 'READ' | 'UNREAD';
    export const MessageStatusEnum = {
        READ: 'READ' as MessageStatusEnum,
        UNREAD: 'UNREAD' as MessageStatusEnum
    };
}