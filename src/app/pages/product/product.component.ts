import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/services/api-service';
import { ActivatedRoute } from '@angular/router';
import { ProductControllerService } from 'src/app/services/api-service';
import { FilterOptions } from 'src/app/models/filter-options';
import { Config } from 'src/app/models/config';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  faLock = faLock;

  private id!: string;
  product?: ProductDTO;


  get isPrivate() {
    return this.product?.visibility == ProductDTO.VisibilityEnum.PRIVATE;
  }

  rating?: number;
  images: string[] = []
  isWaitingForResponse: Boolean = true;

  filterSeller: FilterOptions | undefined
  filterSimilar: FilterOptions | undefined

  loadProduct(): void {
    this.productService.productById(this.id).subscribe(p => {
      this.product = p;

      this.filterSeller = new FilterOptions();
      this.filterSimilar = new FilterOptions();

      this.filterSeller.userId = this.product?.seller?.id;

      this.filterSimilar.primaryCat = this.product?.productCategory?.primaryCat;
      this.filterSimilar.secondaryCat = this.product?.productCategory?.secondaryCat;
      this.filterSimilar.tertiaryCat = this.product?.productCategory?.tertiaryCat;

      if(this.product?.seller?.reviewsTotalSum === 0 || this.product?.seller?.reviewsTotalSum == undefined)
        this.rating = 0;
      else
        this.rating = this.product?.seller?.reviewsTotalSum!/this.product?.seller?.reviewsNumber!;

      this.product.productImages?.forEach(element => {
        this.images.push(element.urlPhoto!);
      });
      this.isWaitingForResponse = false;
    });
  }

  ngOnInit(): void {
      this.route.params.subscribe(params=>{
          this.id = params['id'];
          if(this.id) {
            console.log(this.id);
            this.loadProduct();
          }
        });


        if(this.product?.seller?.reviewsTotalSum == 0 || this.product?.seller?.reviewsTotalSum == undefined)
          this.rating = 0;
        else
          this.rating = this.product?.seller?.reviewsTotalSum!/this.product?.seller?.reviewsNumber!;
    }

   goToSellerProfile(){}

  constructor(private productService: ProductControllerService, private route: ActivatedRoute) {
  }


}
