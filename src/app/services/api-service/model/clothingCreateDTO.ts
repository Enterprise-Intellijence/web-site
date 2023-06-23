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
import { ProductCreateDTO } from './productCreateDTO';
import { SizeDTO } from './sizeDTO';

export interface ClothingCreateDTO extends ProductCreateDTO { 
    productGender: ClothingCreateDTO.ProductGenderEnum;
    clothingSize: SizeDTO;
    colour: ClothingCreateDTO.ColourEnum;
}
export namespace ClothingCreateDTO {
    export type ProductGenderEnum = 'MALE' | 'FEMALE' | 'UNISEX';
    export const ProductGenderEnum = {
        MALE: 'MALE' as ProductGenderEnum,
        FEMALE: 'FEMALE' as ProductGenderEnum,
        UNISEX: 'UNISEX' as ProductGenderEnum
    };
    export type ColourEnum = 'YELLOW' | 'GREEN' | 'BLUE' | 'RED' | 'BLACK' | 'WHITE' | 'MULTICOLOUR';
    export const ColourEnum = {
        YELLOW: 'YELLOW' as ColourEnum,
        GREEN: 'GREEN' as ColourEnum,
        BLUE: 'BLUE' as ColourEnum,
        RED: 'RED' as ColourEnum,
        BLACK: 'BLACK' as ColourEnum,
        WHITE: 'WHITE' as ColourEnum,
        MULTICOLOUR: 'MULTICOLOUR' as ColourEnum
    };
}