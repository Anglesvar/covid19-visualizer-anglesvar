import { Component, OnInit } from '@angular/core';
import { CovidService } from "../covid.service";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  labels=[];
  confirmed=[];
  deaths=[];
  recovered=[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        display:null
      }
    }
  };
  public barChartLabels: Label[] = this.labels;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: this.confirmed, label: 'Confirmed Cases' , type: "line" },
    { data: this.recovered, label: 'Recovered Cases' },
    { data: this.deaths, label: 'Deaths'}
  ];

  stateWise;
  constructor(private covid: CovidService) { }

  ngOnInit(): void {
    this.covid.getDataStateWise().subscribe(res=>{
      console.log(res.data.statewise);
      this.stateWise = res.data.statewise;
      console.log(this.stateWise);
      for(var itr = 0; itr<this.stateWise.length;itr++){
        this.labels.push(this.stateWise[itr]["state"]);
        this.confirmed.push(this.stateWise[itr]["confirmed"])
        this.deaths.push(this.stateWise[itr]["deaths"])
        this.recovered.push(this.stateWise[itr]["recovered"])
      }
      
    });
  }
  
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  

}
