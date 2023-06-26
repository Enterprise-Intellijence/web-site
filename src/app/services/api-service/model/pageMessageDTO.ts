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
import { MessageDTO } from './messageDTO';
import { PageableObject } from './pageableObject';
import { SortObject } from './sortObject';

export interface PageMessageDTO { 
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Array<MessageDTO>;
    number?: number;
    sort?: SortObject;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    empty?: boolean;
}