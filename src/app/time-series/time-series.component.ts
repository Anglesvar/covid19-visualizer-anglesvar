import { Component, OnInit } from '@angular/core';
import { CovidService } from '../covid.service';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.css']
})
export class TimeSeriesComponent implements OnInit {
  date;

  constructor(private covid: CovidService) { }

  ngOnInit(): void {
    this.covid.getData().subscribe(res=>{
      console.log(res);
      for(var i=0;i<res.cases_time_series.length;i++){
        this.date.push(res.cases_time_series[i]["date"]);
        //this.totalCasesPerDay.push(res.cases_time_series[i]["totalconfirmed"])
      }
      console.log(res.cases_time_series);
      
    })
  }

}
