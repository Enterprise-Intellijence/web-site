import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/services/api-service';
import { ActivatedRoute } from '@angular/router';
import { ProductControllerService } from 'src/app/services/api-service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

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
