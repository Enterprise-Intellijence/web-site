import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductControllerService, ProductDTO } from 'src/app/services/api-service';

@Component({
  selector: 'delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss']
})
export class DeleteProductModalComponent {
  @Input() product?: ProductDTO;
  @Output() isProductDeleted = new EventEmitter<boolean>();
  @Output() isProductDeletedWithError = new EventEmitter<boolean>();

  constructor(
    private productService: ProductControllerService,
    private router: Router
  ) { }

  deleteProduct() {
    this.productService.deleteProduct(this.product?.id!).subscribe(
      {
        next: (v) => {
          this.isProductDeleted.emit(true);
        },
        error: (e) => {
          this.isProductDeletedWithError.emit(true);
        }
      });
  }
}
