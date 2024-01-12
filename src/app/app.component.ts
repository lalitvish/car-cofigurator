import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
})
export class AppComponent {
}
