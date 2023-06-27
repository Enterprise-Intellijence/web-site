import { Component, Input, OnChanges } from '@angular/core';
import { FilterOptions } from 'src/app/models/filter-options';
import { ProductBasicDTO, UserBasicDTO } from 'src/app/services/api-service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent implements OnChanges {

  @Input() visitedUser: UserBasicDTO | null = null;
  filter!: FilterOptions;

  constructor() { }

  ngOnChanges(): void {
    this.filter = new FilterOptions();
    this.filter.userId = this.visitedUser?.id;
  }
}
