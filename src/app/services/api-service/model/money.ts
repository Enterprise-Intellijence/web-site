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
import { CurrencyUnit } from './currencyUnit';

export interface Money { 
    zero?: boolean;
    negative?: boolean;
    positive?: boolean;
    scale?: number;
    currencyUnit?: CurrencyUnit;
    amountMajorLong?: number;
    amountMajorInt?: number;
    amountMinor?: number;
    amountMinorLong?: number;
    amountMinorInt?: number;
    minorPart?: number;
    amountMajor?: number;
    positiveOrZero?: boolean;
    negativeOrZero?: boolean;
    amount?: number;
}