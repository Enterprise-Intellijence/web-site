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
import { PaymentMethodDTO } from './paymentMethodDTO';
import { UserImageDTO } from './userImageDTO';

export interface UserDTO { 
    id?: string;
    username: string;
    email?: string;
    bio?: string;
    photoProfile?: UserImageDTO;
    provider: UserDTO.ProviderEnum;
    status?: UserDTO.StatusEnum;
    addresses?: Array<AddressDTO>;
    paymentMethods?: Array<PaymentMethodDTO>;
    role: UserDTO.RoleEnum;
    reviewsTotalSum?: number;
    reviewsNumber?: number;
    followersNumber?: number;
    followingNumber?: number;
}
export namespace UserDTO {
    export type ProviderEnum = 'LOCAL' | 'GOOGLE';
    export const ProviderEnum = {
        LOCAL: 'LOCAL' as ProviderEnum,
        GOOGLE: 'GOOGLE' as ProviderEnum
    };
    export type StatusEnum = 'ACTIVE' | 'BANNED' | 'HIDDEN' | 'HOLIDAY';
    export const StatusEnum = {
        ACTIVE: 'ACTIVE' as StatusEnum,
        BANNED: 'BANNED' as StatusEnum,
        HIDDEN: 'HIDDEN' as StatusEnum,
        HOLIDAY: 'HOLIDAY' as StatusEnum
    };
    export type RoleEnum = 'ADMIN' | 'USER' | 'SUPER_ADMIN';
    export const RoleEnum = {
        ADMIN: 'ADMIN' as RoleEnum,
        USER: 'USER' as RoleEnum,
        SUPERADMIN: 'SUPER_ADMIN' as RoleEnum
    };
}