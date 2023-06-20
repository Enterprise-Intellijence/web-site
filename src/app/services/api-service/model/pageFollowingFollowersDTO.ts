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
import { FollowingFollowersDTO } from './followingFollowersDTO';
import { PageableObject } from './pageableObject';
import { SortObject } from './sortObject';

export interface PageFollowingFollowersDTO { 
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Array<FollowingFollowersDTO>;
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
}