import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarserviceService } from '../../service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  constructor(private Carservice: CarserviceService) {
  }
  get selectModel() {
    return this.Carservice.modelSubject.value;
  }
  get CarImage() {
    return `https://interstate21.com/tesla-app/images/${this.selectModel?.model.code}/${this.selectModel?.colorCode}.jpg`;
  }

}
