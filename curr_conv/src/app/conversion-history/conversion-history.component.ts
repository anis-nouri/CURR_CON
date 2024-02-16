import { Component, Input } from '@angular/core';

interface ConversionRequest {
  realRate: number;
  enteredRate: number;
  initialValue: number;
  initialCurrency: string;
  calculatedValue: number;
  calculatedCurrency: string;
}

@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  styleUrls: ['./conversion-history.component.scss']
})
export class ConversionHistoryComponent {
  @Input() conversionHistory: ConversionRequest[] = [];
}
