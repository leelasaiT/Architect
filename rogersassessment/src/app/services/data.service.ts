import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsiteInformation } from '../models/WebsiteInformation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getWebsiteData(url:string){
    return this.http.get<WebsiteInformation>(url);
  }
  
}