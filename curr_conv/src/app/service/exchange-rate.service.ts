// exchange-rate.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private exchangeRateSubject: BehaviorSubject<number>;
  public exchangeRate$: Observable<number>;

  constructor() {
    this.exchangeRateSubject = new BehaviorSubject<number>(1.1);
    this.exchangeRate$ = this.exchangeRateSubject.asObservable();

    // Met à jour le taux de change toutes les 3 secondes
    setInterval(() => {
      const randomChange = Math.random() * 0.1 - 0.05; // Valeur aléatoire entre -0.05 et +0.05
      const newExchangeRate = this.exchangeRateSubject.value + randomChange;
      this.exchangeRateSubject.next(newExchangeRate);
    }, 3000);
  }

  getExchangeRate(): Observable<number> {
    return this.exchangeRate$;
  }
}
