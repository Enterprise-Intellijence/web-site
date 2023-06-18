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
import { User } from './user';

export interface Report { 
    id?: string;
    reporterUser?: User;
    description?: string;
    reportedUser?: User;
    reportedProduct?: Product;
    date?: Date;
    status?: Report.StatusEnum;
}
export namespace Report {
    export type StatusEnum = 'PENDING' | 'CLOSED';
    export const StatusEnum = {
        PENDING: 'PENDING' as StatusEnum,
        CLOSED: 'CLOSED' as StatusEnum
    };
}