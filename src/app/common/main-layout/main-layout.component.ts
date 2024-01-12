import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarserviceService } from '../../service';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  constructor(private readonly CarserviceService: CarserviceService) {
    this.CarserviceService.getModels().subscribe((data)=>{
      console.log(data);

    });

  }
  get CarImage() {
    return `https://interstate21.com/tesla-app/images/default.jpg`;
  }

}
