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
    amount?: number;
    scale?: number;
    currencyUnit?: CurrencyUnit;
    amountMajorInt?: number;
    amountMajorLong?: number;
    amountMinorLong?: number;
    amountMajor?: number;
    amountMinor?: number;
    amountMinorInt?: number;
    negativeOrZero?: boolean;
    minorPart?: number;
    positiveOrZero?: boolean;
}