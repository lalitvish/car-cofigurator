import { Component } from '@angular/core';
import { CarserviceService } from '../../service';
import { SelectionConfigModel, ModelSelectionModel } from '../../models';
import { Router } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  readonly additionalPackagePrice = 1000;

  modelSelection!: ModelSelectionModel;
  configsSelection!: SelectionConfigModel;

  get selectedColor() {
    return this.modelSelection?.model?.colors?.find(item => item?.code === this.modelSelection?.colorCode);
  }

  constructor(
    private  router: Router,
    private  carService: CarserviceService
  ) { }

  ngOnInit() {
    const model = this.carService.modelSubject.value;
    const configs = this.carService.configsSubject.value;

    if (model) {
      this.modelSelection = model;
    } else {
      this.router.navigateByUrl('/design/selection');
    }

    if (configs) {
      this.configsSelection = configs;
    }
  }

  getTotalPrice() {
    let total = this.configsSelection.config.price;

    if (this.selectedColor?.price) {
      total += this.selectedColor.price;
    }

    if (this.configsSelection.towHitch) {
      total += this.additionalPackagePrice;
    }

    if (this.configsSelection.yoke) {
      total += this.additionalPackagePrice;
    }

    return total;
  }

}
