import { ChangeDetectorRef, Component } from '@angular/core';
import { CarserviceService } from '../../service';
import { TeslaModelModel ,ModelSelectionModel} from '../../models';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-select-model',
  standalone: true,
  imports: [FormsModule,AsyncPipe,NgIf,NgFor],
  templateUrl: './select-model.component.html',
  styleUrl: './select-model.component.scss'
})
export class SelectModelComponent {
  modelsObserver!: Observable<TeslaModelModel[]>;
  models!: TeslaModelModel[];
  moni:any;

  modelCode: string | null = null;
  colorCode: string | null = null;

  get selectedModel() {
    console.log(this.models);

    return this.models?.find(item => item.code === this.modelCode);
  }

  constructor(private readonly Carservice: CarserviceService,public cdr:ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.modelsObserver);

    console.log(this.Carservice.getModels());

    // this.modelsObserver = this.Carservice.getModels();
    // this.modelsObserver.subscribe(models => this.models = models);
    this.Carservice.getModels().subscribe((data)=>{
      console.log(data);

      this.moni =data
      this.cdr.markForCheck();
    })
    this.setSelectedOptions();
  }
changebutton(){
  this.Carservice.getModels().subscribe((data)=>{
    console.log(data);

    this.moni =data
    this.cdr.markForCheck();
  })
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
