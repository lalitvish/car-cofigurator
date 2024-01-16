import { CarserviceService } from './../../service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionConfigModel, ModelOptionModel } from '../../models';
import { CurrencyPipe } from '@angular/common';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-config',
  standalone: true,
  imports: [FormsModule,CurrencyPipe],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  options!: ModelOptionModel;

  configId: number | null = null;
  includeTow = false;
  includeYoke = false;

  get selectedConfig() {
    return this.options.configs?.find(item => item.id === this.configId);
  }

  constructor(
    private  router: Router,
    private  carService: CarserviceService
  ) { }

  ngOnInit() {
    const selectedModel = this.carService.modelSubject.value;
    const modelCode = selectedModel?.model.code;

    if (modelCode) {

      this.carService.getModelOptions(modelCode).subscribe(options => this.options = options);
    } else {
      this.router.navigateByUrl('design/model-selection');
    }

    this.setSelectedOptions();


  }

  saveSelection() {
    if (!this.selectedConfig) {
      return;
    }

    const selection = {
      config: this.selectedConfig,
      towHitch: this.includeTow,
      yoke: this.includeYoke
    } as SelectionConfigModel;

    this.carService.configsSubject.next(selection);
  }

  private setSelectedOptions() {
    const selection = this.carService.configsSubject.value;

    if (selection) {
      this.configId = selection.config.id;
      this.includeTow = selection.towHitch;
      this.includeYoke = selection.yoke;
    }
  }

}
