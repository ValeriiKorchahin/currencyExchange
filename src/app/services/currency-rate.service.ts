import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICurrency} from "../models/ICurrency";
import {currencies} from "../constants/currencies";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(private httpClient:HttpClient) { }

  getUsdToUah(): Observable<ICurrency> {
   return this.httpClient.get<ICurrency>( environment.APIFROM + currencies.USD + environment.APITO + currencies.UAH)
  }
  getEURToUah():Observable<ICurrency> {
    return this.httpClient.get<ICurrency>(environment.APIFROM + currencies.EUR + environment.APITO + currencies.UAH)
  }
  getExchange(from: string, to: string): Observable<ICurrency> {
    return this.httpClient.get<ICurrency>(environment.APIFROM + from + environment.APITO + to)
  }

}
