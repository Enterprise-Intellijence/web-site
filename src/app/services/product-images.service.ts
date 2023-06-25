import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductImageDTO } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  protected basePath = 'https://localhost:8443';

  saveImage(file: File, productId: string, productDescription: string): Observable<ProductImageDTO> {

    const fd: FormData = new FormData();
    fd.append('multipartFile', file);

    return this.http.post<ProductImageDTO>(this.basePath + '/api/v1/images/product?product_id=' + productId + '&description=' + productDescription, fd);
  }


  constructor(private http: HttpClient) { }
}
