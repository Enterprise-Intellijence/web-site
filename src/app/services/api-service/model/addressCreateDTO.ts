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

export interface AddressCreateDTO { 
    header: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}