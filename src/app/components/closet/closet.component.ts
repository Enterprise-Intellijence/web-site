import { Component, Input, OnChanges } from '@angular/core';
import { FilterOptions } from 'src/app/models/filter-options';
import { UserBasicDTO } from 'src/app/services/api-service';

@Component({
  selector: 'closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent implements OnChanges {

  @Input() visitedUser: UserBasicDTO | null = null;
  filter!: FilterOptions;
  isProductEmpty!: boolean;

  constructor() { }

  ngOnChanges(): void {
    this.filter = new FilterOptions();
    this.filter.userId = this.visitedUser?.id;
    console.log(this.isProductEmpty);
  }

  setIsProductEmpty(isProductEmpty: boolean) {
    this.isProductEmpty = isProductEmpty;
  }
}
