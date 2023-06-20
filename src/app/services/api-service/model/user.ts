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
import { Following } from './following';
import { GrantedAuthority } from './grantedAuthority';
import { Message } from './message';
import { Offer } from './offer';
import { Order } from './order';
import { PaymentMethod } from './paymentMethod';
import { Product } from './product';
import { Report } from './report';
import { Review } from './review';
import { UserImage } from './userImage';

export interface User { 
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    bio?: string;
    photoProfile?: UserImage;
    provider?: User.ProviderEnum;
    addresses?: Array<Address>;
    role?: User.RoleEnum;
    emailVerified?: boolean;
    paymentMethods?: Array<PaymentMethod>;
    offersMade?: Array<Offer>;
    sellingProducts?: Array<Product>;
    followers?: Array<Following>;
    following?: Array<Following>;
    followersNumber?: number;
    followingNumber?: number;
    reviewsTotalSum?: number;
    reviewsNumber?: number;
    likedProducts?: Array<Product>;
    sentMessages?: Array<Message>;
    receivedMessages?: Array<Message>;
    orders?: Array<Order>;
    receivedReviews?: Array<Review>;
    sentReviews?: Array<Review>;
    status?: User.StatusEnum;
    reports?: Array<Report>;
    reported?: Array<Report>;
    enabled?: boolean;
    accountNonLocked?: boolean;
    administrator?: boolean;
    authorities?: Array<GrantedAuthority>;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
}
export namespace User {
    export type ProviderEnum = 'LOCAL' | 'GOOGLE';
    export const ProviderEnum = {
        LOCAL: 'LOCAL' as ProviderEnum,
        GOOGLE: 'GOOGLE' as ProviderEnum
    };
    export type RoleEnum = 'ADMIN' | 'USER' | 'SUPER_ADMIN';
    export const RoleEnum = {
        ADMIN: 'ADMIN' as RoleEnum,
        USER: 'USER' as RoleEnum,
        SUPERADMIN: 'SUPER_ADMIN' as RoleEnum
    };
    export type StatusEnum = 'ACTIVE' | 'BANNED' | 'HIDDEN' | 'HOLIDAY';
    export const StatusEnum = {
        ACTIVE: 'ACTIVE' as StatusEnum,
        BANNED: 'BANNED' as StatusEnum,
        HIDDEN: 'HIDDEN' as StatusEnum,
        HOLIDAY: 'HOLIDAY' as StatusEnum
    };
}