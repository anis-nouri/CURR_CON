// currency-converter.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { ExchangeRateService } from '../service/exchange-rate.service';
import { ConversionRequest } from '../models/conversion-request.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {

  @Output() conversionRequested = new EventEmitter<ConversionRequest>();


  amount: number = 1;
  fromCurrency: { code: string, flagUrl: string } = { code: 'USD', flagUrl: 'https://flagcdn.com/48x36/us.png' };
  toCurrency: { code: string, flagUrl: string } = { code: 'EURO', flagUrl: 'https://flagcdn.com/48x36/eu.png' };
  exchangeRate: number = 1.1; 
  exchangeRateMessage: string = 'Getting exchange rate...';
  fixedExchangeRate: number = 0;
  fixedRateEnabled: boolean = false; 
  conversionMessage: string = '';
  convertedAmount:number =1;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRate().subscribe(rate => {
      this.exchangeRate = rate;
    });
  }

  toggleCurrency() {
    const tempCurrency = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tempCurrency;

    // Swap the amount with the converted amount
    const tempAmount = this.amount;
    this.amount = this.convertedAmount;
    this.convertedAmount = tempAmount;

  }
  disableFixedRate() {
    
  }

  onConvertClick() {
    if (Math.abs(this.fixedExchangeRate - this.exchangeRate) > 0.02) {
      this.fixedRateEnabled = false;
      console.log(this.fixedExchangeRate - this.exchangeRate)
    }
    else{this.fixedRateEnabled = true;}

    let convertedAmount: number;
    if (this.fixedRateEnabled) {
      this.convertedAmount = this.amount * this.fixedExchangeRate;
    } else {
      this.convertedAmount = this.amount * this.exchangeRate;
    }
    this.conversionMessage = `Value: ${this.amount} ${this.fromCurrency.code} = ${this.convertedAmount.toFixed(2)} ${this.toCurrency.code}, Fixed value activated: ${this.fixedRateEnabled ? 'Yes' : 'No'}`;

    const conversionRequest: ConversionRequest = {
      realRate: this.exchangeRate,
      enteredRate: this.fixedExchangeRate,
      initialValue: this.amount,
      initialCurrency: this.fromCurrency.code,
      calculatedValue: this.convertedAmount,
      calculatedCurrency: this.toCurrency.code,
    };

    this.conversionRequested.emit(conversionRequest);
  }
}