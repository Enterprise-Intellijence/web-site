import { Component, OnInit } from '@angular/core';
import { InlineResponse200, ProductDTO } from 'src/app/services/api-service';
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
export class ProductComponent implements OnInit {

  faLock = faLock;

  private id?: string;

  product?: ProductDTO;

  token?: string;

  get usingToken() {
    return this.token != undefined;
  }

  get isPrivate() {
    return this.product?.visibility == ProductDTO.VisibilityEnum.PRIVATE;
  }

  rating?: number;
  images: string[] = []
  isWaitingForResponse: Boolean = true;

  filterSeller: FilterOptions | undefined
  filterSimilar: FilterOptions | undefined

  constructor(private productService: ProductControllerService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];

      if (this.id) {
        this.loadProduct();
      }
      else if (this.token) {
        this.loadProductByToken();
      }
    });


    if (this.product?.seller?.reviewsTotalSum == 0 || this.product?.seller?.reviewsTotalSum == undefined)
      this.rating = 0;
    else
      this.rating = this.product?.seller?.reviewsTotalSum! / this.product?.seller?.reviewsNumber!;
  }



  loadProductByToken() {
    if (this.token) {
      this.productService.getProductFromCapability(this.token!).subscribe(product => {
        this.setProduct(product);
      });
    }
  }

  loadProduct(): void {
    if (this.id) {
      this.productService.productById(this.id).subscribe(product => {
        this.setProduct(product);
      });
    }
  }


  private setProduct(product: ProductDTO) {
    this.product = product;

    this.filterSeller = new FilterOptions();
    this.filterSeller.userId = this.product?.seller?.id;

    this.filterSimilar = new FilterOptions();
    this.filterSimilar.primaryCat = this.product?.productCategory?.primaryCat;
    this.filterSimilar.secondaryCat = this.product?.productCategory?.secondaryCat;
    this.filterSimilar.tertiaryCat = this.product?.productCategory?.tertiaryCat;

    if (this.product?.seller?.reviewsTotalSum === 0 || this.product?.seller?.reviewsTotalSum == undefined)
      this.rating = 0;

    else
      this.rating = this.product?.seller?.reviewsTotalSum! / this.product?.seller?.reviewsNumber!;

    this.product.productImages?.forEach(element => {
      this.images.push(element.urlPhoto!);
    });
    this.isWaitingForResponse = false;
  }



}
