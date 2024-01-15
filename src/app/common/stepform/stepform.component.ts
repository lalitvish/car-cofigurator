import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarserviceService } from '../../service';
import { Subject } from 'rxjs/internal/Subject';
import { take, takeUntil } from 'rxjs';
@Component({
  selector: 'app-stepform',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './stepform.component.html',
  styleUrl: './stepform.component.scss'
})
export class StepformComponent {
  DisableConfigStep = true;
  DisablesummaryStep = true;
  destroy$ = new Subject<void>();


  constructor(private readonly Carservice: CarserviceService){

  }
  ngOnInit() {
    this.Carservice.modelSubject.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (model)=>{
        this.DisableConfigStep = !model
      }
    )
    this.Carservice.configsSubject.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (config)=>{
        this.DisableConfigStep =!config
      }
    )
  }
  ngOnDestroy() {
  // this.destroy$.unsubscribe();

  }
}
