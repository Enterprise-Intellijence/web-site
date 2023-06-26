import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductImageDTO } from './api-service';
import { Observable } from 'rxjs';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  updateUserImage(file: File, userId: string): Observable<ProductImageDTO> {
    const fd = this.createFormData(file);
    return this.http.post<ProductImageDTO>(Config.basePath + '/images/users/photo-profile/' + userId, fd);
  }

  saveProductImage(file: File, productId: string, productDescription: string): Observable<ProductImageDTO> {
    const fd = this.createFormData(file);
    return this.http.post<ProductImageDTO>(Config.basePath + '/images/product?product_id=' + productId + '&description=' + productDescription, fd);
  }

  createFormData(file: File): FormData {
    const fd: FormData = new FormData();
    fd.append('multipartFile', file);
    return fd;
  }

  constructor(private http: HttpClient) { }
}
