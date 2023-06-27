import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/services/api-service';
import { ActivatedRoute } from '@angular/router';
import { ProductControllerService } from 'src/app/services/api-service';
import { FilterOptions } from 'src/app/models/filter-options';
import { Config } from 'src/app/models/config';
@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  private id!: string;
  product?: ProductDTO;
  rating?: number; 
  images: String[] = []
  isWaitingForResponse: Boolean = true;

  filterSeller: FilterOptions | undefined

  loadProduct(): void {
    this.productService.productById(this.id).subscribe(p => {
      this.product = p;

      this.filterSeller = new FilterOptions()
      
      this.filterSeller.userId = this.product?.seller?.id

      if(this.product?.seller?.reviewsTotalSum === 0 || this.product?.seller?.reviewsTotalSum == undefined)
        this.rating = 0;
      else
        this.rating = this.product?.seller?.reviewsTotalSum!/this.product?.seller?.reviews_number!;

      this.product.productImages?.forEach(element => {
        this.images.push(Config.basePath + element.urlPhoto!)
      });
      this.isWaitingForResponse = false;
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
