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
import { HttpHeadersHostAddress } from './httpHeadersHostAddress';

export interface HttpHeadersHost { 
    address?: HttpHeadersHostAddress;
    port?: number;
    unresolved?: boolean;
    hostName?: string;
    hostString?: string;
}