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
import { OfferDTO } from './offerDTO';
import { ProductDTO } from './productDTO';
import { UserDTO } from './userDTO';

export interface MessageDTO { 
    id?: string;
    context?: string;
    product?: ProductDTO;
    sendUser?: UserDTO;
    receivedUser?: UserDTO;
    offer?: OfferDTO;
}