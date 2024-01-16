import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CarserviceService } from '../../service';
import { Subscription, take, takeUntil } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  DisableConfigStep = true;
  DisablesummaryStep = true;
  private subscription$ = new Subscription();

  constructor(private carService: CarserviceService){

  }
  ngOnInit() {
    this.subscription$.add(
      this.carService.modelSubject.subscribe((model) => {
         this.DisableConfigStep = !model
      }
    ))
    this.subscription$.add(
      this.carService.configsSubject.subscribe((configs) =>{
         this.DisablesummaryStep = !configs
        }
    ))

  }
  ngOnDestroy() {

  this.subscription$.unsubscribe();
  }
}
