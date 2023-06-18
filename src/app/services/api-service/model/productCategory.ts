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
import { Product } from './product';

export interface ProductCategory { 
    id?: string;
    primaryCat?: string;
    secondaryCat?: string;
    tertiaryCat?: string;
    visibility?: ProductCategory.VisibilityEnum;
    products?: Array<Product>;
}
export namespace ProductCategory {
    export type VisibilityEnum = 'PUBLIC' | 'PRIVATE';
    export const VisibilityEnum = {
        PUBLIC: 'PUBLIC' as VisibilityEnum,
        PRIVATE: 'PRIVATE' as VisibilityEnum
    };
}