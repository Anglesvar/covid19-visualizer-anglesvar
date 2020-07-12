import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  data
  state
  district
  url_statewise = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'
  url_dailycases = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise/history'
  url_districtwise = "https://api.covid19india.org/state_district_wise.json"
  url_general = "https://api.covid19india.org/data.json"
  urlTotalCases = "https://covid19.mathdro.id/api/countries/india"
  districtData;

  constructor(private http: HttpClient) { }

  getDataStateWise(): Observable<any> {
    return this.http.get(this.url_statewise)
  }
  getTotalCase():Observable<any>{
    return this.http.get(this.urlTotalCases);
  }
  
  getData(): Observable<any>{
    return this.http.get(this.url_general);
  }

  getState(state) {
    this.state = state
  }

  getDataDistrictWise() {
    return this.http.get(this.url_districtwise)

    
    // this.http.get(this.ulr_districtwise).subscribe(data=>{
    //   // this.districtData.next(this.district)
    //   console.log(data);
    //   this.district = this.data[state].districtData
    //   this.districtData=this.district   
    //   console.log("from service",this.districtData);
        
    //})
    //return this.http.get(this.ulr_districtwise);
  }
}
