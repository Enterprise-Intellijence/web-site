import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductControllerService, ProductDTO } from 'src/app/services/api-service';

@Component({
  selector: 'product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  private id!: string;
  product?: ProductDTO;

  loadProduct(): void {
    this.productService.productById(this.id).subscribe(p => {
      this.product = p;
    });
  }

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
          this.id = params['id'];
          if(this.id) {
            this.loadProduct();
          }
      });
  }

  constructor(private productService: ProductControllerService, private route: ActivatedRoute) {

  }
}
