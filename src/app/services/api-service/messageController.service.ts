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

import { MessageCreateDTO } from '../model/messageCreateDTO';
import { MessageDTO } from '../model/messageDTO';
import { PageMessageDTO } from '../model/pageMessageDTO';
import { ResponseStatusException } from '../model/responseStatusException';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MessageControllerService {

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
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createMessage(body: MessageCreateDTO, observe?: 'body', reportProgress?: boolean): Observable<MessageDTO>;
    public createMessage(body: MessageCreateDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDTO>>;
    public createMessage(body: MessageCreateDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDTO>>;
    public createMessage(body: MessageCreateDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createMessage.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<MessageDTO>('post',`${this.basePath}/api/v1/messages`,
            {
                body: body,
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
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteMessage(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteMessage(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteMessage(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteMessage(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteMessage.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/v1/messages/${encodeURIComponent(String(id))}`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllMyConversations(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAllMyConversations(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAllMyConversations(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAllMyConversations(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<any>('get',`${this.basePath}/api/v1/messages/conversations`,
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
     * @param user 
     * @param prodId 
     * @param page 
     * @param sizePage 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getConversation(user: string, prodId?: string, page?: number, sizePage?: number, observe?: 'body', reportProgress?: boolean): Observable<PageMessageDTO>;
    public getConversation(user: string, prodId?: string, page?: number, sizePage?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageMessageDTO>>;
    public getConversation(user: string, prodId?: string, page?: number, sizePage?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageMessageDTO>>;
    public getConversation(user: string, prodId?: string, page?: number, sizePage?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (user === null || user === undefined) {
            throw new Error('Required parameter user was null or undefined when calling getConversation.');
        }




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (prodId !== undefined && prodId !== null) {
            queryParameters = queryParameters.set('prodId', <any>prodId);
        }
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

        return this.httpClient.request<PageMessageDTO>('get',`${this.basePath}/api/v1/messages/conversations/${encodeURIComponent(String(user))}`,
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
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMessage(id: string, observe?: 'body', reportProgress?: boolean): Observable<MessageDTO>;
    public getMessage(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDTO>>;
    public getMessage(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDTO>>;
    public getMessage(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getMessage.');
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

        return this.httpClient.request<MessageDTO>('get',`${this.basePath}/api/v1/messages/${encodeURIComponent(String(id))}`,
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
     * @param body 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public replaceMessage(body: MessageDTO, id: string, observe?: 'body', reportProgress?: boolean): Observable<MessageDTO>;
    public replaceMessage(body: MessageDTO, id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDTO>>;
    public replaceMessage(body: MessageDTO, id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDTO>>;
    public replaceMessage(body: MessageDTO, id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling replaceMessage.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling replaceMessage.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<MessageDTO>('put',`${this.basePath}/api/v1/messages/${encodeURIComponent(String(id))}`,
            {
                body: body,
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
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setReadMessages(body: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setReadMessages(body: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setReadMessages(body: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setReadMessages(body: Array<string>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling setReadMessages.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/api/v1/messages/read`,
            {
                body: body,
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
     * @param body 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateMessage(body: MessageDTO, id: string, observe?: 'body', reportProgress?: boolean): Observable<MessageDTO>;
    public updateMessage(body: MessageDTO, id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDTO>>;
    public updateMessage(body: MessageDTO, id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDTO>>;
    public updateMessage(body: MessageDTO, id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateMessage.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateMessage.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<MessageDTO>('patch',`${this.basePath}/api/v1/messages/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
