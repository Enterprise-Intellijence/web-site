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
import { NotificationDTO } from './notificationDTO';
import { PageableObject } from './pageableObject';
import { SortObject } from './sortObject';

export interface PageNotificationDTO { 
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Array<NotificationDTO>;
    number?: number;
    sort?: SortObject;
    numberOfElements?: number;
    pageable?: PageableObject;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
}