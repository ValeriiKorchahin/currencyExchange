import {Component, OnInit} from '@angular/core';
import {CurrencyRateService} from "./services/currency-rate.service";
import {ICurrency} from "./models/ICurrency";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  USD: ICurrency;
  EUR: ICurrency;

  constructor(private currencyRateToUahService:CurrencyRateService) {
  }

  ngOnInit() {
    this.currencyRateToUahService.getUsdToUah().subscribe(value => {
      this.USD = value
    })

    this.currencyRateToUahService.getEURToUah().subscribe(value => {
      this.EUR = value
    })
  }
}
