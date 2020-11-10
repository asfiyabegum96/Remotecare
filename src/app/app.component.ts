import { Component } from '@angular/core';
import { BackendserviceService } from './backendservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public service: BackendserviceService) { }
}
