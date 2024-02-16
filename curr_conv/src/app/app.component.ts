import { Component } from '@angular/core';
import { ConversionRequest } from './models/conversion-request.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'curr_con';
  conversionHistory: ConversionRequest[] = [];

  onConversionRequested(conversionRequest: ConversionRequest) {
    this.conversionHistory.unshift(conversionRequest);
    this.conversionHistory = this.conversionHistory.slice(0, 5);
    console.log(this.conversionHistory)
  }
}
