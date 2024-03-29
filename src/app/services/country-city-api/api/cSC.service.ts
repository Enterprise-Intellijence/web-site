/**
 * Country State City API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: gadadarshan@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Country } from '../model/country';
import { State } from '../model/state';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CSCService {

    protected basePath = 'https://api.countrystatecity.in/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get the list of cities in a country.
     * 
     * @param ciso ISO2 Code of Country
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesCisoCitiesGet(ciso: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public countriesCisoCitiesGet(ciso: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public countriesCisoCitiesGet(ciso: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public countriesCisoCitiesGet(ciso: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (ciso === null || ciso === undefined) {
            throw new Error('Required parameter ciso was null or undefined when calling countriesCisoCitiesGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/countries/${encodeURIComponent(String(ciso))}/cities`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the country details from ISO2 Code
     * 
     * @param ciso ISO2 Code of Country
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesCisoGet(ciso: string, observe?: 'body', reportProgress?: boolean): Observable<Country>;
    public countriesCisoGet(ciso: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Country>>;
    public countriesCisoGet(ciso: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Country>>;
    public countriesCisoGet(ciso: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (ciso === null || ciso === undefined) {
            throw new Error('Required parameter ciso was null or undefined when calling countriesCisoGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Country>('get',`${this.basePath}/countries/${encodeURIComponent(String(ciso))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the list of states within country
     * 
     * @param ciso ISO2 Code of Country
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesCisoStatesGet(ciso: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public countriesCisoStatesGet(ciso: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public countriesCisoStatesGet(ciso: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public countriesCisoStatesGet(ciso: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (ciso === null || ciso === undefined) {
            throw new Error('Required parameter ciso was null or undefined when calling countriesCisoStatesGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/countries/${encodeURIComponent(String(ciso))}/states`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the list of cities in a state.
     * 
     * @param ciso ISO2 Code of Country
     * @param siso ISO2 Code of State
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesCisoStatesSisoCitiesGet(ciso: string, siso: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public countriesCisoStatesSisoCitiesGet(ciso: string, siso: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public countriesCisoStatesSisoCitiesGet(ciso: string, siso: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public countriesCisoStatesSisoCitiesGet(ciso: string, siso: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (ciso === null || ciso === undefined) {
            throw new Error('Required parameter ciso was null or undefined when calling countriesCisoStatesSisoCitiesGet.');
        }

        if (siso === null || siso === undefined) {
            throw new Error('Required parameter siso was null or undefined when calling countriesCisoStatesSisoCitiesGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/countries/${encodeURIComponent(String(ciso))}/states/${encodeURIComponent(String(siso))}/cities`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the state details from ISO2 Code
     * 
     * @param ciso ISO2 Code of Country
     * @param siso ISO2 Code of State
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesCisoStatesSisoGet(ciso: string, siso: string, observe?: 'body', reportProgress?: boolean): Observable<Array<State>>;
    public countriesCisoStatesSisoGet(ciso: string, siso: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<State>>>;
    public countriesCisoStatesSisoGet(ciso: string, siso: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<State>>>;
    public countriesCisoStatesSisoGet(ciso: string, siso: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (ciso === null || ciso === undefined) {
            throw new Error('Required parameter ciso was null or undefined when calling countriesCisoStatesSisoGet.');
        }

        if (siso === null || siso === undefined) {
            throw new Error('Required parameter siso was null or undefined when calling countriesCisoStatesSisoGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<State>>('get',`${this.basePath}/countries/${encodeURIComponent(String(ciso))}/states/${encodeURIComponent(String(siso))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the list of countries
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<Country>>;
    public countriesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Country>>>;
    public countriesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Country>>>;
    public countriesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        
        console.log("http request at api");

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            console.log("apiKey: ", this.configuration.apiKeys["X-CSCAPI-KEY"]);
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Country>>('get',`${this.basePath}/countries`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the list of states
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public statesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<State>>;
    public statesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<State>>>;
    public statesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<State>>>;
    public statesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["X-CSCAPI-KEY"]) {
            headers = headers.set('X-CSCAPI-KEY', this.configuration.apiKeys["X-CSCAPI-KEY"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<State>>('get',`${this.basePath}/states`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
