import {Component, HostListener, OnInit} from '@angular/core';
import {PageUserDTO, ProductControllerService, SizeDTO} from "../../../services/api-service";
import {CurrentUserService} from "../../../services/current-user.service";
import {FormControl} from "@angular/forms";
import {ProductSizesService} from "../../../services/product-sizes.service";


@Component({
  selector: 'manage-sizes',
  templateUrl: './manage-sizes.component.html',
  styleUrls: ['./manage-sizes.component.scss'],
  styles: [
    `
			.form-control {
				width: 300px;
			}
		`,
  ],
})
export class ManageSizesComponent implements OnInit{



  sizeList?: Array<SizeDTO>
  originalSizeList?: Array<SizeDTO>
  inputSizeType = new FormControl

  constructor(private productController: ProductControllerService, private currenteUser: CurrentUserService, private sizeService: ProductSizesService) {
  }

  ngOnInit(): void {
    this.sizeService.onSizesLoaded.subscribe((sizes) => {
      if (this.sizeService.areSizesLoaded) {
        this.originalSizeList = sizes;
        this.sizeList = sizes;
      }
    });


/*
    this.originalSizeList = this.sizeService.getAllSizes()
    this.sizeList = this.sizeService.getAllSizes()
*/

/*    this.productController.getSizesList().subscribe({
      next: (value: Array<SizeDTO>) => {
        this.originalSizeList = value;
        this.sizeList = value;
      }
    });*/

    console.log(this.sizeList)
  }

  editSize(size: SizeDTO) {

  }

  removeSize(size: SizeDTO) {

  }

  handleInput(value: string) {
    if (value.length === 0) {
      this.sizeList = this.originalSizeList;
    } else {
      const filteredList = this.originalSizeList?.filter((size) =>
        size.type.toLowerCase().includes(value.toLowerCase())
      );
      this.sizeList = filteredList;
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.length % 2 === 0) {
      this.handleInput(value);
    }
  }

  @HostListener('keydown.enter', ['$event.target.value'])
  onEnter(value: string) {
    this.handleInput(value);
  }
}
