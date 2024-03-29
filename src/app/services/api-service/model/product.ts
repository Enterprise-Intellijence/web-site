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
import { CustomMoney } from './customMoney';
import { Message } from './message';
import { Offer } from './offer';
import { Order } from './order';
import { ProductCategory } from './productCategory';
import { ProductImage } from './productImage';
import { Report } from './report';
import { User } from './user';

export interface Product { 
    id?: string;
    title?: string;
    description?: string;
    productCost?: CustomMoney;
    deliveryCost?: CustomMoney;
    brand?: string;
    condition?: Product.ConditionEnum;
    productSize?: Product.ProductSizeEnum;
    views?: number;
    uploadDate?: Date;
    lastUpdateDate?: Date;
    visibility?: Product.VisibilityEnum;
    availability?: Product.AvailabilityEnum;
    productCategory?: ProductCategory;
    likesNumber?: number;
    seller?: User;
    usersThatLiked?: Array<User>;
    offers?: Array<Offer>;
    messages?: Array<Message>;
    order?: Array<Order>;
    productImages?: Array<ProductImage>;
    reports?: Array<Report>;
}
export namespace Product {
    export type ConditionEnum = 'NEW_WITH_TAG' | 'NEW_WITHOUT_TAG' | 'VERY_GOOD' | 'GOOD' | 'ACCEPTABLE';
    export const ConditionEnum = {
        NEWWITHTAG: 'NEW_WITH_TAG' as ConditionEnum,
        NEWWITHOUTTAG: 'NEW_WITHOUT_TAG' as ConditionEnum,
        VERYGOOD: 'VERY_GOOD' as ConditionEnum,
        GOOD: 'GOOD' as ConditionEnum,
        ACCEPTABLE: 'ACCEPTABLE' as ConditionEnum
    };
    export type ProductSizeEnum = 'BIG' | 'MEDIUM' | 'SMALL';
    export const ProductSizeEnum = {
        BIG: 'BIG' as ProductSizeEnum,
        MEDIUM: 'MEDIUM' as ProductSizeEnum,
        SMALL: 'SMALL' as ProductSizeEnum
    };
    export type VisibilityEnum = 'PUBLIC' | 'PRIVATE';
    export const VisibilityEnum = {
        PUBLIC: 'PUBLIC' as VisibilityEnum,
        PRIVATE: 'PRIVATE' as VisibilityEnum
    };
    export type AvailabilityEnum = 'AVAILABLE' | 'PENDING' | 'UNAVAILABLE';
    export const AvailabilityEnum = {
        AVAILABLE: 'AVAILABLE' as AvailabilityEnum,
        PENDING: 'PENDING' as AvailabilityEnum,
        UNAVAILABLE: 'UNAVAILABLE' as AvailabilityEnum
    };
}