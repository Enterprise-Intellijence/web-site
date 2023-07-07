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

import { ImagesProductBody } from '../model/imagesProductBody';
import { PhotoprofileIdBody } from '../model/photoprofileIdBody';
import { ProductIdBody } from '../model/productIdBody';
import { ProductImageDTO } from '../model/productImageDTO';
import { UserImageDTO } from '../model/userImageDTO';
import { UsersPhotoprofileBody } from '../model/usersPhotoprofileBody';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ImageControllerService {

    protected basePath = 'http://localhost:8080';
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
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteImageProduct(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteImageProduct(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteImageProduct(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteImageProduct(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteImageProduct.');
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/v1/images/product/${encodeURIComponent(String(id))}`,
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
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deletePhotoUser(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deletePhotoUser(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deletePhotoUser(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deletePhotoUser(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deletePhotoUser.');
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/v1/images/users/photo-profile/${encodeURIComponent(String(id))}`,
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
     * @param type 
     * @param folderName 
     * @param fileName 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getImage(type: string, folderName: string, fileName: string, observe?: 'body', reportProgress?: boolean): Observable<Blob>;
    public getImage(type: string, folderName: string, fileName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Blob>>;
    public getImage(type: string, folderName: string, fileName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Blob>>;
    public getImage(type: string, folderName: string, fileName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (type === null || type === undefined) {
            throw new Error('Required parameter type was null or undefined when calling getImage.');
        }

        if (folderName === null || folderName === undefined) {
            throw new Error('Required parameter folderName was null or undefined when calling getImage.');
        }

        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getImage.');
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'image/png',
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Blob>('get',`${this.basePath}/api/v1/images/${encodeURIComponent(String(type))}/${encodeURIComponent(String(folderName))}/${encodeURIComponent(String(fileName))}`,
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
    public replaceImageProduct(body: ProductIdBody, id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public replaceImageProduct(body: ProductIdBody, id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public replaceImageProduct(body: ProductIdBody, id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public replaceImageProduct(body: ProductIdBody, id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling replaceImageProduct.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling replaceImageProduct.');
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/v1/images/product/${encodeURIComponent(String(id))}`,
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
    public replacePhotoUser(body: PhotoprofileIdBody, id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public replacePhotoUser(body: PhotoprofileIdBody, id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public replacePhotoUser(body: PhotoprofileIdBody, id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public replacePhotoUser(body: PhotoprofileIdBody, id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling replacePhotoUser.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling replacePhotoUser.');
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/v1/images/users/photo-profile/${encodeURIComponent(String(id))}`,
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
     * @param productId 
     * @param description 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveImageProduct(body: ImagesProductBody, productId: string, description: string, observe?: 'body', reportProgress?: boolean): Observable<ProductImageDTO>;
    public saveImageProduct(body: ImagesProductBody, productId: string, description: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductImageDTO>>;
    public saveImageProduct(body: ImagesProductBody, productId: string, description: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductImageDTO>>;
    public saveImageProduct(body: ImagesProductBody, productId: string, description: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveImageProduct.');
        }

        if (productId === null || productId === undefined) {
            throw new Error('Required parameter productId was null or undefined when calling saveImageProduct.');
        }

        if (description === null || description === undefined) {
            throw new Error('Required parameter description was null or undefined when calling saveImageProduct.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (productId !== undefined && productId !== null) {
            queryParameters = queryParameters.set('product_id', <any>productId);
        }
        if (description !== undefined && description !== null) {
            queryParameters = queryParameters.set('description', <any>description);
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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

        return this.httpClient.request<ProductImageDTO>('post',`${this.basePath}/api/v1/images/product`,
            {
                body: body,
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
     * @param body 
     * @param description 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public savePhotoUser(body: UsersPhotoprofileBody, description: string, observe?: 'body', reportProgress?: boolean): Observable<UserImageDTO>;
    public savePhotoUser(body: UsersPhotoprofileBody, description: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserImageDTO>>;
    public savePhotoUser(body: UsersPhotoprofileBody, description: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserImageDTO>>;
    public savePhotoUser(body: UsersPhotoprofileBody, description: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling savePhotoUser.');
        }

        if (description === null || description === undefined) {
            throw new Error('Required parameter description was null or undefined when calling savePhotoUser.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (description !== undefined && description !== null) {
            queryParameters = queryParameters.set('description', <any>description);
        }

        let headers = this.defaultHeaders;

        // authentication (App_Bearer_token) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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

        return this.httpClient.request<UserImageDTO>('post',`${this.basePath}/api/v1/images/users/photo-profile`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
