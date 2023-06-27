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
  rating?: number; 

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

        if(this.product?.seller?.reviewsTotalSum == 0 || this.product?.seller?.reviewsTotalSum == undefined)
          this.rating = 0;
        else
          this.rating = this.product?.seller?.reviewsTotalSum!/this.product?.seller?.reviewsNumber!;

  }

  constructor(private productService: ProductControllerService, private route: ActivatedRoute) {
  }


}
