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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { FollowingFollowersDTO } from '../model/followingFollowersDTO';
import { PageFollowingFollowersDTO } from '../model/pageFollowingFollowersDTO';
import { ResponseStatusException } from '../model/responseStatusException';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class FollowingControllerService {

    protected basePath = 'https://localhost:8443';
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
     * 
     * 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public follow(userId: string, observe?: 'body', reportProgress?: boolean): Observable<FollowingFollowersDTO>;
    public follow(userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FollowingFollowersDTO>>;
    public follow(userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FollowingFollowersDTO>>;
    public follow(userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling follow.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<FollowingFollowersDTO>('post',`${this.basePath}/api/v1/follow/${encodeURIComponent(String(userId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param userId 
     * @param page 
     * @param sizePage 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFollowersOfUser(userId: string, page?: number, sizePage?: number, observe?: 'body', reportProgress?: boolean): Observable<PageFollowingFollowersDTO>;
    public getFollowersOfUser(userId: string, page?: number, sizePage?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageFollowingFollowersDTO>>;
    public getFollowersOfUser(userId: string, page?: number, sizePage?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageFollowingFollowersDTO>>;
    public getFollowersOfUser(userId: string, page?: number, sizePage?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getFollowersOfUser.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (sizePage !== undefined && sizePage !== null) {
            queryParameters = queryParameters.set('sizePage', <any>sizePage);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PageFollowingFollowersDTO>('get',`${this.basePath}/api/v1/followers/${encodeURIComponent(String(userId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param userId 
     * @param page 
     * @param sizePage 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFollowingByUser(userId: string, page?: number, sizePage?: number, observe?: 'body', reportProgress?: boolean): Observable<PageFollowingFollowersDTO>;
    public getFollowingByUser(userId: string, page?: number, sizePage?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageFollowingFollowersDTO>>;
    public getFollowingByUser(userId: string, page?: number, sizePage?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageFollowingFollowersDTO>>;
    public getFollowingByUser(userId: string, page?: number, sizePage?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling getFollowingByUser.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (sizePage !== undefined && sizePage !== null) {
            queryParameters = queryParameters.set('sizePage', <any>sizePage);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PageFollowingFollowersDTO>('get',`${this.basePath}/api/v1/following/${encodeURIComponent(String(userId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public imFollowingThisUser(userId: string, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public imFollowingThisUser(userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public imFollowingThisUser(userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public imFollowingThisUser(userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling imFollowingThisUser.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<boolean>('get',`${this.basePath}/api/v1/me/following/${encodeURIComponent(String(userId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param userId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unfollow(userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public unfollow(userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public unfollow(userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public unfollow(userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling unfollow.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/api/v1/follow/${encodeURIComponent(String(userId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}