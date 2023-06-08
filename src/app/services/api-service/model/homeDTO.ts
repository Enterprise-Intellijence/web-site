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
import { ProductDTO } from './productDTO';
import { ProductImageDTO } from './productImageDTO';
import { UserBasicDTO } from './userBasicDTO';

export interface HomeDTO extends ProductDTO { 
    colour: HomeDTO.ColourEnum;
    homeSize: HomeDTO.HomeSizeEnum;
    homeMaterial: HomeDTO.HomeMaterialEnum;
}
export namespace HomeDTO {
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
    export type HomeSizeEnum = '_30x50cm' | '_35x50cm' | '_35x40cm' | '_40x40cm' | '_40x60cm' | '_40x75cm' | '_40x80cm' | '_40x90cm' | '_45x45cm' | '_50x50cm' | '_50x60cm' | '_50x70cm' | '_50x90cm' | '_60x60cm' | '_65x65cm' | '_80x80cm' | '_70x90cm' | '_80x100cm' | '_100x150cm' | '_100x200cm' | '_110x150cm' | '_110x170cm' | '_120x160cm' | '_120x200cm' | '_130x200cm' | '_125x150cm' | '_130x170cm' | '_150x200cm' | '_180x200cm' | 'other';
    export const HomeSizeEnum = {
        _30x50cm: '_30x50cm' as HomeSizeEnum,
        _35x50cm: '_35x50cm' as HomeSizeEnum,
        _35x40cm: '_35x40cm' as HomeSizeEnum,
        _40x40cm: '_40x40cm' as HomeSizeEnum,
        _40x60cm: '_40x60cm' as HomeSizeEnum,
        _40x75cm: '_40x75cm' as HomeSizeEnum,
        _40x80cm: '_40x80cm' as HomeSizeEnum,
        _40x90cm: '_40x90cm' as HomeSizeEnum,
        _45x45cm: '_45x45cm' as HomeSizeEnum,
        _50x50cm: '_50x50cm' as HomeSizeEnum,
        _50x60cm: '_50x60cm' as HomeSizeEnum,
        _50x70cm: '_50x70cm' as HomeSizeEnum,
        _50x90cm: '_50x90cm' as HomeSizeEnum,
        _60x60cm: '_60x60cm' as HomeSizeEnum,
        _65x65cm: '_65x65cm' as HomeSizeEnum,
        _80x80cm: '_80x80cm' as HomeSizeEnum,
        _70x90cm: '_70x90cm' as HomeSizeEnum,
        _80x100cm: '_80x100cm' as HomeSizeEnum,
        _100x150cm: '_100x150cm' as HomeSizeEnum,
        _100x200cm: '_100x200cm' as HomeSizeEnum,
        _110x150cm: '_110x150cm' as HomeSizeEnum,
        _110x170cm: '_110x170cm' as HomeSizeEnum,
        _120x160cm: '_120x160cm' as HomeSizeEnum,
        _120x200cm: '_120x200cm' as HomeSizeEnum,
        _130x200cm: '_130x200cm' as HomeSizeEnum,
        _125x150cm: '_125x150cm' as HomeSizeEnum,
        _130x170cm: '_130x170cm' as HomeSizeEnum,
        _150x200cm: '_150x200cm' as HomeSizeEnum,
        _180x200cm: '_180x200cm' as HomeSizeEnum,
        Other: 'other' as HomeSizeEnum
    };
    export type HomeMaterialEnum = 'Cotton' | 'Linen' | 'Wool' | 'Acrylic' | 'Chiffon' | 'Polyamide_Nylon' | 'Polyester' | 'Silk' | 'Ceramic' | 'Glass' | 'Stainless_Steel' | 'Plastic' | 'Wood' | 'Stone' | 'Porcelain' | 'Silver' | 'Metal' | 'Other';
    export const HomeMaterialEnum = {
        Cotton: 'Cotton' as HomeMaterialEnum,
        Linen: 'Linen' as HomeMaterialEnum,
        Wool: 'Wool' as HomeMaterialEnum,
        Acrylic: 'Acrylic' as HomeMaterialEnum,
        Chiffon: 'Chiffon' as HomeMaterialEnum,
        PolyamideNylon: 'Polyamide_Nylon' as HomeMaterialEnum,
        Polyester: 'Polyester' as HomeMaterialEnum,
        Silk: 'Silk' as HomeMaterialEnum,
        Ceramic: 'Ceramic' as HomeMaterialEnum,
        Glass: 'Glass' as HomeMaterialEnum,
        StainlessSteel: 'Stainless_Steel' as HomeMaterialEnum,
        Plastic: 'Plastic' as HomeMaterialEnum,
        Wood: 'Wood' as HomeMaterialEnum,
        Stone: 'Stone' as HomeMaterialEnum,
        Porcelain: 'Porcelain' as HomeMaterialEnum,
        Silver: 'Silver' as HomeMaterialEnum,
        Metal: 'Metal' as HomeMaterialEnum,
        Other: 'Other' as HomeMaterialEnum
    };
}