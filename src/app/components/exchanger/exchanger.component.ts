import { Component, OnInit } from '@angular/core';
import {CurrencyRateService} from "../../services/currency-rate.service";

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss']
})
export class ExchangerComponent implements OnInit {

  //Values of select controllers
  firstSelectedCurrency = 'USD';
  secondSelectedCurrency = 'UAH';

  //Values of input controllers
  firstInputValue: any = 1;
  secondInputValue: any = 1;

  constructor(private currencyRateService: CurrencyRateService) {
  }

  ngOnInit(): void {
    this.currencyRateService.getExchange(this.firstSelectedCurrency, this.secondSelectedCurrency).subscribe(({info}) => {
      if (isNaN(this.firstInputValue)){
        this.secondInputValue = 'Error';
      } else {
        this.secondInputValue = +(this.firstInputValue * info.rate).toFixed(4)
      }
    })

    this.currencyRateService.getExchange(this.secondSelectedCurrency, this.firstSelectedCurrency).subscribe(({info}) => {
      if (isNaN(this.secondInputValue)){
        this.firstInputValue = 'Error';
      } else {
        this.firstInputValue = +(this.secondInputValue * info.rate).toFixed(4);
      }
    })

  }

  firstInputController(value: number) {
    this.firstInputValue = value;
    if(isNaN(this.firstInputValue)){
      this.secondInputValue = 'Error';
    } else {
      this.currencyRateService.getExchange(this.firstSelectedCurrency, this.secondSelectedCurrency).subscribe(({info}) => {
        this.secondInputValue = +(this.firstInputValue * info.rate).toFixed(4);
      })
    }
  }

  secondInputController(value: number) {
    this.secondInputValue = value;
    if(isNaN(this.secondInputValue)){
      this.firstInputValue = 'Error';
    } else {
      this.currencyRateService.getExchange(this.secondSelectedCurrency, this.firstSelectedCurrency).subscribe(({info}) => {
        this.firstInputValue = +(this.secondInputValue * info.rate).toFixed(4);
      })
    }
  }

  firstCurrencyControllerChange(value: string) {
      this.currencyRateService.getExchange(this.secondSelectedCurrency, value).subscribe(({info}) => {
        if (isNaN(this.secondInputValue)) {
          this.firstInputValue = 'Error';
        } else {
          this.firstInputValue = +(this.secondInputValue * info.rate).toFixed(4);
        }
      })
  }

  secondCurrencyControllerChange(value: string) {
      this.currencyRateService.getExchange(this.firstSelectedCurrency, value).subscribe(({info}) => {
        if (isNaN(this.firstInputValue)) {
          this.secondInputValue = 'Error';
        } else {
          this.secondInputValue = +(this.firstInputValue * info.rate).toFixed(4);
        }
      })
  }

}
