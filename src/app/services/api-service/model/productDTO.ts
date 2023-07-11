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
import { ProductCategoryDTO } from './productCategoryDTO';
import { ProductImageDTO } from './productImageDTO';
import { UserBasicDTO } from './userBasicDTO';

export interface ProductDTO {
    id: string;
    title: string;
    description?: string;
    productCost: CustomMoneyDTO;
    deliveryCost: CustomMoneyDTO;
    brand?: string;
    condition: ProductDTO.ConditionEnum;
    likesNumber?: number;
    seller: UserBasicDTO;
    productSize: ProductDTO.ProductSizeEnum;
    views?: number;
    uploadDate?: Date;
    lastUpdateDate?: Date;
    visibility: ProductDTO.VisibilityEnum;
    availability: ProductDTO.AvailabilityEnum;
    productCategory: ProductCategoryDTO;
    usersThatLiked?: Array<UserBasicDTO>;
    productImages?: Array<ProductImageDTO>;
    type: string;
}
export namespace ProductDTO {
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
