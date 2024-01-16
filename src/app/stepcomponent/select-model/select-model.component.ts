import { Component } from '@angular/core';
import { CarserviceService } from '../../service';
import {ModelSelectionModel, CarModelModel} from '../../models';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-select-model',
  standalone: true,
  imports: [FormsModule,AsyncPipe,NgIf,NgFor],
  templateUrl: './select-model.component.html',
  styleUrl: './select-model.component.scss'
})
export class SelectModelComponent {
  modelsObserver!: Observable<CarModelModel[]>;
  models!: CarModelModel[];

  modelCode: string | null = null;
  colorCode: string | null = null;

  get selectedModel() {
    return this.models?.find(item => item.code === this.modelCode);
  }

  constructor(private  Carservice: CarserviceService) { }

  ngOnInit() {

    this.modelsObserver = this.Carservice.getModels();
    this.modelsObserver.subscribe(models => this.models = models);
    this.setSelectedOptions();
  }

  modelSelected() {
    this.colorCode = this.selectedModel ? this.selectedModel?.colors[0]?.code : null;
    this.saveSelection();

    if (this.Carservice.configsSubject.value) {
      this.Carservice.configsSubject.next(null);
    }
  }

  saveSelection() {
    const selection = {
      model: this.selectedModel,
      colorCode: this.colorCode
    } as ModelSelectionModel;
   console.log(selection);

    this.Carservice.modelSubject.next(selection);
  }

  private setSelectedOptions() {
    const selection = this.Carservice.modelSubject.value;

    if (selection) {
      this.modelCode = selection.model.code;
      this.colorCode = selection.colorCode;
    }
  }

}
